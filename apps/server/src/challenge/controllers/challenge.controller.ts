import { QueryBus } from '@nestjs/cqrs';
import { Controller, Get, Param } from '@nestjs/common';
import { GetChallengeQuery } from '../queries/impl/get-challenge.query';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('code/:codename')
  getChallenge(@Param('codename') codename: string) {
    return this.queryBus.execute(new GetChallengeQuery(codename));
  }
}
