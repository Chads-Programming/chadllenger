import { Query } from '@nestjs/cqrs';

export class GetPlayerChallengeQuery extends Query<string> {
  constructor(public readonly playerId: string) {
    super();
  }
}
