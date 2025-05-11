import {
  CommandHandler,
  ICommandHandler,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { AnswerQuest, IQuestQuizChallenge, QuestResponse } from '@repo/schemas';
import { AnswerQuestQuizCommand } from '../impl/answer-quest-quiz.command';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { CustomError } from '@/core/errors/custom-error';
import { ErrorCodes } from '@/lib/errors';
import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.command';

@CommandHandler(AnswerQuestQuizCommand)
export class AnswerQuestQuizHandler
  implements ICommandHandler<AnswerQuestQuizCommand, QuestResponse>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: AnswerQuestQuizCommand): Promise<QuestResponse> {
    try {
      const challenge = await this.queryBus.execute(
        new GetChallengeQuery(command.anwserPayload.codename),
      );

      const quest = challenge.challenges.find(
        (challenge) => challenge.id === command.anwserPayload.questionId,
      );

      const response = this.compareAnswers(
        command.anwserPayload,
        quest as IQuestQuizChallenge,
      );

      const participant = challenge.findParticipant(
        command.anwserPayload.participantId,
      );

      participant.score += response.score;

      challenge.updateParticipant(participant);

      await this.commandBus.execute(new UpdateQuizzChallengeCommand(challenge));

      return response;
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
    const correctOption = quest.question.options.find(
      (option) => option.isCorrectAnswer === true,
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
