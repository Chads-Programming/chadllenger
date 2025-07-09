import { Command } from '@nestjs/cqrs';
import { IGeneratedQuizChallenge } from '@repo/schemas';

export class GenerateChallengeCommand extends Command<IGeneratedQuizChallenge> {
  constructor(
    public readonly challengeId: string,
  ) {
    super();
  }
}
