import { Command } from '@nestjs/cqrs';
import { ChallengeStateModel } from '../../models/challenge-state.model';
import { CreateChallenge } from '@repo/schemas';

export class CreateChallengeCommand extends Command<ChallengeStateModel> {
  constructor(
    public readonly creatorId: string,
    public readonly createChallenge: CreateChallenge,
  ) {
    super();
  }
}
