import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetOnlineCountQuery } from '../queries/impl/get-online-count.query';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('online')
  getOnlineTotalOnline() {
    return this.queryBus.execute(new GetOnlineCountQuery());
  }
}
