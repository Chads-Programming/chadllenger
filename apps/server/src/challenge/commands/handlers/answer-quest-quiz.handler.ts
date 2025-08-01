import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { GetChallengeQuery } from '@/challenge/queries/impl/get-challenge.query';
import { RegisterAnswerRequestType } from '@/challenge/types/challenge-store';
import { CustomError } from '@/core/errors/custom-error';
import { ErrorCodes } from '@/lib/errors';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { IQuestQuizChallenge } from '@repo/schemas';
import { AnswerQuestQuizCommand } from '../impl/answer-quest-quiz.command';
import { UpdateQuizzChallengeCommand } from '../impl/update-quizz-challenge.command';
import { ChadLogger } from '@/logger/chad-logger';

@CommandHandler(AnswerQuestQuizCommand)
export class AnswerQuestQuizHandler
  implements ICommandHandler<AnswerQuestQuizCommand, ChallengeStateBuilder>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly logger: ChadLogger,
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

      const isCurrentQuestion = quest.id === challenge.currentChallenge;

      if (!isCurrentQuestion) {
        throw CustomError.badArguments({
          origin: 'AnswerQuestQuizHandler::execute',
          code: ErrorCodes.EXPIRED_QUEST,
          message:
            'The provided question ID does not match the current challenge.',
        });
      }

      const correctOption = quest.question.options.find(
        (option) => option.isCorrectAnswer === true,
      );

      const answerResponse: RegisterAnswerRequestType = {
        participantId: command.anwserPayload.participantId,
        questionId: command.anwserPayload.questionId,
        answer: command.anwserPayload.answer,
        correctAnswer: correctOption.text,
      };

      this.logger.log(
        `Registering answer for participant ${command.anwserPayload.participantId} on question ${command.anwserPayload.questionId}`,
      );

      challenge.registryParticipantAnswer(answerResponse);

      await this.commandBus.execute(new UpdateQuizzChallengeCommand(challenge));

      this.logger.log(
        `Answer registered successfully for participant ${command.anwserPayload.participantId} on question ${command.anwserPayload.questionId}`,
      );

      return challenge;
    } catch (error) {
      this.logger.error(
        '`Error in AnswerQuestQuizHandler',
        null,
        'AnswerQuestQuizHandler::execute',
        error,
      );

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
