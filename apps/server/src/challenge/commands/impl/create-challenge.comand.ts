import { Command } from '@nestjs/cqrs';
import { ChallengeStateBuilder } from '../../models/challenge-state.model';
import { CreateChallenge } from '@repo/schemas';

export class CreateChallengeCommand extends Command<ChallengeStateBuilder> {
  constructor(
    public readonly creatorId: string,
    public readonly createChallenge: CreateChallenge,
  ) {
    super();
  }
}
