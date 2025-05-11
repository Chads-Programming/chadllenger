import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QuizChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { GetQuizChallengeQuery } from '../impl/get-quiz-challenge-query.query';
import { ChallengeType } from '@repo/schemas';

@QueryHandler(GetQuizChallengeQuery)
export class GetQuizChallengeQueryHandler
  implements IQueryHandler<GetQuizChallengeQuery, QuizChallengeStateBuilder> {
  constructor(private readonly challengeRepository: ChallengeCacheRepository) { }

  async execute(query: GetQuizChallengeQuery): Promise<QuizChallengeStateBuilder> {
    const challenge = await this.challengeRepository.findChallengeByCodename(query.codename);

    if (challenge.type !== ChallengeType.Quiz) throw new Error('Challenge is not a quiz');

    return challenge as QuizChallengeStateBuilder;
  }
}
