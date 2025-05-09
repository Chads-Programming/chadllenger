import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { Query } from '@nestjs/cqrs';

export class GetChallengeQuery extends Query<ChallengeStateBuilder> {
  constructor(public readonly codename: string) {
    super();
  }
}
