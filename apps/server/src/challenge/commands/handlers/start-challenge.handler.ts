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
  implements ICommandHandler<StartChallengeCommand, IChallengeState>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(commnand: StartChallengeCommand) {
    try {
      const currentChallenge = await this.queryBus.execute(
        new GetChallengeQuery(commnand.codename),
      );

      currentChallenge
        .setStatus(Status.IN_PROGRESS)
        .nextChallenge()
        .markAsStarted();

      await this.challengeRepository.updateChallenge(
        commnand.codename,
        currentChallenge,
      );

      this.eventBus.publish(
        new StartedChallengeEvent(currentChallenge.codename),
      );

      return this.queryBus.execute(new GetChallengeQuery(commnand.codename));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.serverError({
        code: ErrorCodes.DEFAULT_ERROR,
        message: error.toString(),
        origin: 'StartChallengeHandler::execute',
      });
    }
  }
}
