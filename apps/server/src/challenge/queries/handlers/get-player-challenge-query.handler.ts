import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPlayerChallengeQuery } from '../impl/get-player-challenge.query';
import { PlayerCacheRepository } from '@/challenge/repositories/player-cache.repository';

@QueryHandler(GetPlayerChallengeQuery)
export class GetPlayerChallengeQueryHandler implements IQueryHandler<string> {
  constructor(private readonly playerCacheRepository: PlayerCacheRepository) {}

  execute(playerId: string): Promise<string> {
    return this.playerCacheRepository.getPlayerRoom(playerId);
  }
}
