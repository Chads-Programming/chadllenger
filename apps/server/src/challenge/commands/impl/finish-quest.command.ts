import { Command } from '@nestjs/cqrs';
import { ChallengeStateBuilder } from '../../models/challenge-state.model';

export class FinishQuestCommand extends Command<ChallengeStateBuilder> {
  constructor(public readonly codename: string) {
    super();
  }
}
