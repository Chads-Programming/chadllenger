import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { IChallengeState } from '@repo/schemas';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { StartChallengeCommand } from '../impl/start-challenge.comman';
import { ErrorCodes } from '@/lib/errors';
import { CustomError } from '@/core/errors/custom-error';

@CommandHandler(StartChallengeCommand)
export class StartChallengeHandler
  implements ICommandHandler<string, IChallengeState>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
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

      currentChallenge.setStatus(currentChallenge.status);

      await this.challengeRepository.updateChallenge(codename, {
        challenges: currentChallenge.challenges,
      });

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
