import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { JoinChallengeCommand } from '../impl/join-challenge.command';
import {
  JoinChallengeResponseType,
  JoinStatus,
} from '@/challenge/types/challenge-store';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { CustomError } from '@/core/errors/custom-error';
import { PlayerCacheRepository } from '@/challenge/repositories/player-cache.repository';
import { ChadLogger } from '@/logger/chad-logger';
import { ErrorCodes } from '@/lib/errors';
import { Status } from '@repo/schemas';
import { ParticipantModel } from '@/challenge/models/participant.model';

@CommandHandler(JoinChallengeCommand)
export class JoinChallengeHandler
  implements ICommandHandler<JoinChallengeCommand, JoinChallengeResponseType>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly playerCacheRepository: PlayerCacheRepository,
    private readonly queryBus: QueryBus,
    private readonly logger: ChadLogger,
  ) {}

  async execute(
    command: JoinChallengeCommand,
  ): Promise<JoinChallengeResponseType> {
    const challenge = await this.queryBus.execute(
      new GetChallengeQuery(command.joinRequest.challengeCodename),
    );

    if (!challenge) {
      throw CustomError.notFound({
        origin: 'JoinChallengeHandler',
        code: ErrorCodes.CHALLENGE_NOT_FOUND,
        message: 'Challenge not found',
      });
    }

    const existinParticipant = await this.findParticipantById(
      command.joinRequest.challengeCodename,
      command.joinRequest.participantId,
    );

    if (existinParticipant) {
      return {
        status: JoinStatus.ALREADY_JOINED,
        participant: existinParticipant,
      };
    }

    if (challenge.status !== Status.PENDING) {
      throw CustomError.badArguments({
        origin: 'JoinChallengeHandler',
        code: ErrorCodes.CHALLENGE_IS_NOT_PENDING,
        message: 'Challenge is not in pending status',
      });
    }

    const participant = new ParticipantModel(
      command.joinRequest.participantId,
      command.joinRequest.participantName,
    );

    await Promise.all([
      this.challengeRepository.updateChallenge(
        command.joinRequest.challengeCodename,
        {
          participants: [...challenge.participants, participant],
        },
      ),
      this.playerCacheRepository.setPlayerRoom(
        command.joinRequest.participantId,
        challenge.codename,
      ),
    ]);

    this.logger.log('Participant added', 'JoinChallengeHandler::execute', {
      participant,
    });

    return {
      status: JoinStatus.JOINED,
      participant,
    };
  }

  private async findParticipantById(
    codename: string,
    id: string,
  ): Promise<ParticipantModel | null> {
    const challenge = await this.queryBus.execute(
      new GetChallengeQuery(codename),
    );

    const participant = challenge.participants.find(
      (participant) => participant.id === id,
    );

    if (!participant) {
      return null;
    }

    return participant;
  }
}
