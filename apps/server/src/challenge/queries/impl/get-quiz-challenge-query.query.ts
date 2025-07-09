import { QuizChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { Query } from '@nestjs/cqrs';

export class GetQuizChallengeQuery extends Query<QuizChallengeStateBuilder> {
  constructor(public readonly codename: string) {
    super();
  }
}
