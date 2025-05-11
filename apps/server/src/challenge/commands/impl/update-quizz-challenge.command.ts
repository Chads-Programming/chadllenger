
import { Command } from '@nestjs/cqrs';
import {
  UpdateQuizzChallengeRequestType,
} from '@/challenge/types/challenge-store';
import { IChallengeState } from '@repo/schemas';

export class UpdateQuizzChallengeCommand extends Command<IChallengeState> {
  constructor(public readonly data: UpdateQuizzChallengeRequestType) {
    super();
  }
}
