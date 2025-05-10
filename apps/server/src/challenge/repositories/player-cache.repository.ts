import { envs } from '@/config/envs';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PlayerCacheRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getPlayerRoom(type: string, playerId: string): Promise<string | null> {
    const room = await this.cache.get<string>(
      `player:${playerId}:${type}:room`,
    );

    if (!room) {
      return null;
    }

    return room;
  }

  async setPlayerRoom(
    type: string,
    playerId: string,
    room: string,
  ): Promise<void> {
    await this.cache.set<string>(
      `player:${playerId}:${type}:room`,
      room,
      this.getTttl(),
    );
  }

  private getTttl(): number {
    return Number(envs.CHALLENGE_TTL);
  }
}
