import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { AnswerQuestionRequestType } from '@/challenge/types/challenge-store';
import { Command } from '@nestjs/cqrs';

export class AnswerQuestQuizCommand extends Command<ChallengeStateBuilder> {
  constructor(public readonly anwserPayload: AnswerQuestionRequestType) {
    super();
  }
}
