import {
  CommandBus,
  CommandHandler,
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

@CommandHandler(StartNextQuestCommand)
export class StartNextQuestHandler
  implements ICommandHandler<StartNextQuestCommand, IChallengeState>
{
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: ChadLogger,
  ) {}

  async execute(command: StartNextQuestCommand): Promise<IChallengeState> {
    const { codename } = command;

    const origin = 'StartNextQuestHandler::execute';

    this.logger.log('Starting next quest', origin, codename);

    try {
      const challenge = await this.queryBus.execute(
        new GetChallengeQuery(codename),
      );

      challenge.nextChallenge();

      const updatedChallenge = await this.commandBus.execute(
        new UpdateQuizzChallengeCommand(challenge.getProps()),
      );

      this.logger.log('Finish to update: next quest', origin, {
        currentQuest: updatedChallenge.currentChallenge,
      });

      await this.eventEmitter.emit(
        CHALLENGE_EVENTS.NEW_QUEST_STARTED,
        updatedChallenge,
      );

      return updatedChallenge;
    } catch (error) {
      throw CustomError.serverError({
        origin,
        code: error.code,
        message: error.message,
      });
    }
  }
}
