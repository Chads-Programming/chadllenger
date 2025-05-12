import {
  CommandHandler,
  ICommandHandler,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { IQuestQuizChallenge } from '@repo/schemas';
import { AnswerQuestQuizCommand } from '../impl/answer-quest-quiz.command';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { CustomError } from '@/core/errors/custom-error';
import { ErrorCodes } from '@/lib/errors';
import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.command';
import { RegisterAnswerRequestType } from '@/challenge/types/challenge-store';
import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';

@CommandHandler(AnswerQuestQuizCommand)
export class AnswerQuestQuizHandler
  implements ICommandHandler<AnswerQuestQuizCommand, ChallengeStateBuilder>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: AnswerQuestQuizCommand,
  ): Promise<ChallengeStateBuilder> {
    try {
      const challenge = await this.queryBus.execute(
        new GetChallengeQuery(command.anwserPayload.codename),
      );

      const quest = challenge.challenges.find(
        (challenge) => challenge.id === command.anwserPayload.questionId,
      ) as IQuestQuizChallenge;

      const correctOption = quest.question.options.find(
        (option) => option.isCorrectAnswer === true,
      );

      const answerResponse: RegisterAnswerRequestType = {
        participantId: command.anwserPayload.participantId,
        questionId: command.anwserPayload.questionId,
        answer: command.anwserPayload.answer,
        correctAnswer: correctOption.text,
      };

      challenge.registryParticipantAnswer(answerResponse);

      await this.commandBus.execute(new UpdateQuizzChallengeCommand(challenge));

      return challenge;
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
}
