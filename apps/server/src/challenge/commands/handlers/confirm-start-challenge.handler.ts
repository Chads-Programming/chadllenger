import { ConfirmStartChallengeCommand } from './../impl/confirm-start-challenge.command';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { IChallengeState } from '@repo/schemas';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { StartChallengeCommand } from '../impl/start-challenge.comman';
import { ErrorCodes } from '@/lib/errors';
import { CustomError } from '@/core/errors/custom-error';
import { StartNextQuestCommand } from '../impl/start-next-quest.command';

@CommandHandler(ConfirmStartChallengeCommand)
export class ConfirmStartChallengeHandler
  implements ICommandHandler<ConfirmStartChallengeCommand, IChallengeState>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(commnand: StartChallengeCommand) {
    try {
      const currentChallenge = await this.queryBus.execute(
        new GetChallengeQuery(commnand.codename),
      );

      currentChallenge.confirmStart();

      await this.challengeRepository.updateChallenge(
        commnand.codename,
        currentChallenge,
      );

      await this.commandBus.execute(
        new StartNextQuestCommand(currentChallenge.codename),
      );

      return currentChallenge;
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
