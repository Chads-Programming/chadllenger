import { ChadLogger } from '@/logger/chad-logger';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  IChallengeState,
  IQuestChallenge,
  IQuestChallengeState,
} from '@repo/schemas';
import { FinishQuestCommand } from '../impl/finish-quest.command';
import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { CustomError } from '@/core/errors/custom-error';
import { ErrorCodes } from '@/lib/errors';
import { CHALLENGE_EVENTS } from '@/challenge/consts';
import { FinishedQuesEvent } from '@/challenge/events/impl/finished-quest.event';
import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.command';

@CommandHandler(FinishQuestCommand)
export class FinishQuestHandler
  implements ICommandHandler<FinishQuestCommand, IChallengeState>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: ChadLogger,
  ) {}
  async execute(
    command: FinishQuestCommand,
  ): Promise<ChallengeStateBuilder<IQuestChallenge, IQuestChallengeState>> {
    const { codename } = command;

    this.logger.log(
      `Start finish quest command - ${codename}`,
      'FinishQuestHandler::execute',
    );
    try {
      const currentChallenge = await this.queryBus.execute(
        new GetChallengeQuery(codename),
      );

      if (!currentChallenge) {
        throw CustomError.notFound({
          code: ErrorCodes.CHALLENGE_NOT_FOUND,
          message: 'Challenge not found',
          origin: 'FinishQuestHandler::execute',
        });
      }

      currentChallenge.finishCurrentQuest();

      const updatedChallenge = await this.commandBus.execute(
        new UpdateQuizzChallengeCommand(currentChallenge.getProps()),
      );

      this.eventEmitter.emit(CHALLENGE_EVENTS.QUEST_FINISHED, updatedChallenge);
      this.eventBus.publish(new FinishedQuesEvent(currentChallenge.codename));

      this.logger.log(
        `Finished quest command - ${codename}`,
        'FinishQuestHandler::execute',
      );

      return this.queryBus.execute(new GetChallengeQuery(codename));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      this.logger.error(error, null, 'FinishQuestHandler::execute', error);

      throw CustomError.serverError({
        code: ErrorCodes.DEFAULT_ERROR,
        message: 'Failed to start challenge',
        origin: 'FinishQuestHandler::execute',
        data: error,
      });
    }
  }
}
