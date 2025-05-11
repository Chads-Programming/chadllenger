import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { IChallengeState } from '@repo/schemas';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';

import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.command';

@CommandHandler(UpdateQuizzChallengeCommand)
export class UpdateQuizzChallengeHandler
  implements ICommandHandler<UpdateQuizzChallengeCommand, IChallengeState>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(
    command: UpdateQuizzChallengeCommand,
  ): Promise<IChallengeState> {
    await this.challengeRepository.updateChallenge(
      command.data.codename,
      command.data,
    );

    return this.queryBus.execute(new GetChallengeQuery(command.data.codename));
  }
}
