import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChallengeQuery } from '../impl/get-challenge.query';

@QueryHandler(GetChallengeQuery)
export class GetChallengeQueryHandler
  implements IQueryHandler<GetChallengeQuery, ChallengeStateBuilder>
{
  constructor(private readonly challengeRepository: ChallengeCacheRepository) {}

  async execute(query: GetChallengeQuery): Promise<ChallengeStateBuilder> {
    return this.challengeRepository.findChallengeByCodename(query.codename);
  }
}
