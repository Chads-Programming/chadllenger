import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { IChallengeState, Status } from '@repo/schemas';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { StartChallengeCommand } from '../impl/start-challenge.comman';
import { ErrorCodes } from '@/lib/errors';
import { CustomError } from '@/core/errors/custom-error';
import { StartedChallengeEvent } from '@/challenge/events/impl/started-challenge.event';

@CommandHandler(StartChallengeCommand)
export class StartChallengeHandler
  implements ICommandHandler<string, IChallengeState>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(codename: string): Promise<IChallengeState> {
    try {
      const currentChallenge = await this.queryBus.execute(
        new GetChallengeQuery(codename),
      );

      if (!currentChallenge) {
        throw CustomError.notFound({
          code: ErrorCodes.CHALLENGE_NOT_FOUND,
          message: 'Challenge not found',
          origin: 'ChallengeGateway::startChallenge',
        });
      }

      currentChallenge
        .setStatus(Status.IN_PROGRESS)
        .nextChallenge()
        .markAsStarted();

      await this.challengeRepository.updateChallenge(codename, {
        challenges: currentChallenge.challenges,
      });

      this.eventBus.publish(
        new StartedChallengeEvent(currentChallenge.codename),
      );

      return this.queryBus.execute(new GetChallengeQuery(codename));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.serverError({
        code: ErrorCodes.DEFAULT_ERROR,
        message: 'Failed to start challenge',
        origin: 'StartChallengeHandler::execute',
      });
    }
  }
}
