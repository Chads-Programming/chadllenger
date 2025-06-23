import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { StartNextQuestCommand } from '../impl/start-next-quest.command';
import { ChadLogger } from '@/logger/chad-logger';
import { IChallengeState } from '@repo/schemas';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHALLENGE_EVENTS } from '@/challenge/consts';
import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.command';
import { CustomError } from '@/core/errors/custom-error';
import { FinishChallengeCommand } from '../impl/finish-challenge.command';
import { StartedQuestEvent } from '@/challenge/events/impl/started-quest.event';

@CommandHandler(StartNextQuestCommand)
export class StartNextQuestHandler
  implements ICommandHandler<StartNextQuestCommand, IChallengeState>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly logger: ChadLogger,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: StartNextQuestCommand): Promise<IChallengeState> {
    const { codename } = command;

    const origin = 'StartNextQuestHandler::execute';

    this.logger.log('Starting next quest', origin, codename);

    try {
      const challenge = await this.queryBus.execute(
        new GetChallengeQuery(codename),
      );

      if (challenge.hasCompleteAllQuest()) {
        this.logger.log('No more quests to start', origin, {
          codename,
        });

        return await this.commandBus.execute(
          new FinishChallengeCommand(codename),
        );
      }

      challenge.nextQuest();

      const updatedChallenge = await this.commandBus.execute(
        new UpdateQuizzChallengeCommand(challenge.getProps()),
      );

      this.logger.log('Finish to update: next quest', origin, {
        currentQuest: updatedChallenge.currentChallenge,
      });

      await Promise.all([
        this.eventEmitter.emit(
          CHALLENGE_EVENTS.NEW_QUEST_STARTED,
          updatedChallenge,
        ),
        this.eventBus.publish(
          new StartedQuestEvent(
            updatedChallenge.codename,
            challenge.currentChallenge,
          ),
        ),
      ]);

      return updatedChallenge;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.serverError({
        origin,
        code: error.code,
        message: error,
      });
    }
  }
}
