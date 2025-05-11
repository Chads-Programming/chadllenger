import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { Query } from '@nestjs/cqrs';
import { IQuestQuizChallenge } from '@repo/schemas';

export class GetQuizChallengeQuery extends Query<ChallengeStateBuilder<IQuestQuizChallenge>> {
  constructor(public readonly codename: string) {
    super();
  }
}
