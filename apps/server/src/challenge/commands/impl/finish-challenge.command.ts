import { Command } from '@nestjs/cqrs';
import { ChallengeStateModel } from '../../models/challenge-state.model';

export class FinishChallengeCommand extends Command<ChallengeStateModel> {
  constructor(public readonly codename: string) {
    super();
  }
}
