import { AnswerQuestionRequestType } from '@/challenge/types/challenge-store';
import { Command } from '@nestjs/cqrs';
import { QuestResponse } from '@repo/schemas';

export class AnswerQuestQuizCommand extends Command<QuestResponse> {
  constructor(public readonly anwserPayload: AnswerQuestionRequestType) {
    super();
  }
}
