import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChallengeQuery } from '../impl/get-challenge.query';
import { ChallengeStateModel } from '@/challenge/models/challenge-state.model';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';

@QueryHandler(GetChallengeQuery)
export class GetChallengeQueryHandler
  implements IQueryHandler<GetChallengeQuery, ChallengeStateModel>
{
  constructor(private readonly challengeRepository: ChallengeCacheRepository) {}

  async execute(query: GetChallengeQuery): Promise<ChallengeStateModel> {
    return this.challengeRepository.findChallengeByCodename(query.codename);
  }
}
