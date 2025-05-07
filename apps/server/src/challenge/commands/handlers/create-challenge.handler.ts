import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateChallengeCommand } from '../impl/create-challenge.comand';
import { ChallengeCacheRepository } from '../../repositories/challenge-cache.repository';
import { CodeChallengeRepository } from '@/database/repositories/code-challenge.repository';
import { ChallengeStateBuilder } from '../../models/challenge-state.model';
import { envs } from '@/config/envs';
import { CreateChallengeRequestType } from '../../types/challenge-store';
import { PlayerCacheRepository } from '../../repositories/player-cache.repository';
import { CustomError } from '@/core/errors/custom-error';
import { CreatedChallengeEvent } from '../../events/impl/created-challenge.event';
import { ErrorCodes } from '@/lib/errors';
import { Status } from '@repo/schemas';
import { ParticipantModel } from '@/challenge/models/participant.model';

const CODE_CHALLENGES_SIZE = 3;
const CHALLENGE_EXPIRATION_TIME = Math.ceil(Number(envs.CHALLENGE_TTL) / 2);

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeHandler
  implements ICommandHandler<CreateChallengeCommand, ChallengeStateBuilder>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly codeChallengeRepository: CodeChallengeRepository,
    private readonly playerCacheRepository: PlayerCacheRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CreateChallengeCommand,
  ): Promise<ChallengeStateBuilder> {
    const { creatorId, createChallenge } = command;

    try {
      const codeChallenges =
        await this.codeChallengeRepository.getRandomChallengesByDifficult(
          createChallenge.difficulties,
          CODE_CHALLENGES_SIZE,
        );
      const creatorParticpant = new ParticipantModel(
        creatorId,
        createChallenge.creatorName,
      );
      const challengeStore: CreateChallengeRequestType = {
        title: createChallenge.title,
        creator: creatorId,
        participants: [creatorParticpant],
        codeChallenges,
        status: Status.PENDING,
        expiration: CHALLENGE_EXPIRATION_TIME,
      };

      const challenge =
        await this.challengeRepository.createChallenge(challengeStore);
      await this.playerCacheRepository.setPlayerRoom(
        creatorId,
        challenge.codename,
      );

      this.eventBus.publish(new CreatedChallengeEvent(challenge.codename));

      return challenge;
    } catch (error) {
      throw CustomError.serverError({
        origin: 'ChallengeService',
        message: 'Error creating challenge',
        code: ErrorCodes.DEFAULT_ERROR,
        data: error,
      });
    }
  }
}
