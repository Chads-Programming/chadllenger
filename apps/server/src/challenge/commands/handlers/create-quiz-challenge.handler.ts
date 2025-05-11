import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClashChallengeCommand } from '../impl/create-clash-challenge.command';
import { ChallengeCacheRepository } from '../../repositories/challenge-cache.repository';
import { ChallengeStateBuilder } from '../../models/challenge-state.model';
import { envs } from '@/config/envs';
import { CreateChallengeRequestType } from '../../types/challenge-store';
import { PlayerCacheRepository } from '../../repositories/player-cache.repository';
import { CustomError } from '@/core/errors/custom-error';
import { ErrorCodes } from '@/lib/errors';
import { Status } from '@repo/schemas';
import { ParticipantModel } from '@/challenge/models/participant.model';
import { CreateQuizChallengeCommand } from '../impl/create-quiz-challenge.command';

const CHALLENGE_EXPIRATION_TIME = Math.ceil(Number(envs.CHALLENGE_TTL) / 2);

@CommandHandler(CreateQuizChallengeCommand)
export class CreateQuizChallengeHandler
  implements ICommandHandler<CreateClashChallengeCommand, ChallengeStateBuilder>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly playerCacheRepository: PlayerCacheRepository,
  ) {}

  async execute(
    command: CreateClashChallengeCommand,
  ): Promise<ChallengeStateBuilder> {
    const { creatorId, createChallenge } = command;

    try {
      const creatorParticpant = new ParticipantModel(
        creatorId,
        createChallenge.creatorName,
      );

      const challengeStore: CreateChallengeRequestType = {
        title: createChallenge.title,
        creator: creatorId,
        participants: [creatorParticpant],
        challenges: [],
        status: Status.PENDING,
        expiration: CHALLENGE_EXPIRATION_TIME,
        type: createChallenge.type,
        difficulties: createChallenge.difficulties,
      };

      const challenge =
        await this.challengeRepository.createChallenge(challengeStore);
      await this.playerCacheRepository.setPlayerRoom(
        creatorId,
        challenge.codename,
      );

      // TODO: emitir evento respectivo para este caso

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
