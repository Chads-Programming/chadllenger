import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOnlineCountQuery } from '../impl/get-online-count.query';
import { LobbyCacheRepository } from '@/challenge/repositories/lobby-cache.repository';

@QueryHandler(GetOnlineCountQuery)
export class GetOnlineCountQueryHandler implements IQueryHandler<number> {
  constructor(private readonly lobbyCacheRepository: LobbyCacheRepository) {}

  async execute(): Promise<number> {
    const onlineTotal = await this.lobbyCacheRepository.getOnlineTotalOnline();
    return onlineTotal;
  }
}
