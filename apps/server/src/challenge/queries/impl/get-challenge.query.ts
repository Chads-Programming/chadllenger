import { ChallengeStateModel } from '@/challenge/models/challenge-state.model';
import { Query } from '@nestjs/cqrs';

export class GetChallengeQuery extends Query<ChallengeStateModel> {
  constructor(public readonly codename: string) {
    super();
  }
}
