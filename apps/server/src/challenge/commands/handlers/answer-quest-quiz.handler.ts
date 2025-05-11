import { ChallengeCacheRepository } from '@/challenge/repositories/challenge-cache.repository';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { AnswerQuest, IQuestQuizChallenge, QuestResponse } from '@repo/schemas';
import { AnswerQuestQuizCommand } from '../impl/answer-quest-quiz.command';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { CustomError } from '@/core/errors/custom-error';
import { ErrorCodes } from '@/lib/errors';

@CommandHandler(AnswerQuestQuizCommand)
export class AnswerQuestQuizHandler
  implements ICommandHandler<AnswerQuestQuizCommand, QuestResponse>
{
  constructor(
    private readonly challengeRespository: ChallengeCacheRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: AnswerQuestQuizCommand): Promise<QuestResponse> {
    try {
      const challenge = await this.queryBus.execute(
        new GetChallengeQuery(command.anwserPayload.codename),
      );

      const quest = challenge.challenges.find(
        (challenge) => challenge.id === command.anwserPayload.questionId,
      );

      // TODO: update challenge with the answer
      return this.compareAnswers(
        command.anwserPayload,
        quest as IQuestQuizChallenge,
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.serverError({
        origin: 'AnswerQuestQuizHandler::execute',
        code: ErrorCodes.DEFAULT_ERROR,
        message: 'An error occurred while processing the command.',
      });
    }
  }

  private compareAnswers(
    answer: AnswerQuest,
    quest: IQuestQuizChallenge,
  ): QuestResponse {
    const correctOption = quest.questions.options.find(
      (option) => option.isAnswer === true,
    );

    return {
      isAnwserCorrect: answer.answer === correctOption.text,
      score: 10,
      questionId: answer.questionId,
      yourAnswer: answer.answer,
      correctAwnswer: correctOption.text,
    };
  }
}
