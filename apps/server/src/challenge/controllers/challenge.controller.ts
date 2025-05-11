import { QueryBus } from '@nestjs/cqrs';
import { Controller, Get, Param } from '@nestjs/common';
import { GetQuizChallengeQuery } from '../queries/impl/get-quiz-challenge-query.query';
import { isQuizChallenge } from '../util/is-quiz-challenge';
import { removeCorrectAnswer } from '../util/remove-correct-answer';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly queryBus: QueryBus) { }

  @Get('code/:codename')
  async getChallenge(@Param('codename') codename: string) {
    const challenge = await this.queryBus.execute(new GetQuizChallengeQuery(codename));

    if (isQuizChallenge(challenge)) return removeCorrectAnswer(challenge);
    return challenge;
  }
}

