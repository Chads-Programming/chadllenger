import { Command } from '@nestjs/cqrs';
import { AnswerQuest, QuestResponse } from '@repo/schemas';

export class AnswerQuestQuizCommand extends Command<QuestResponse> {
  constructor(public readonly anwserPayload: AnswerQuest) {
    super();
  }
}
