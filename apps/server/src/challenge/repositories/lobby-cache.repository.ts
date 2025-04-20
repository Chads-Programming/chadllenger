import { envs } from '@/config/envs';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class LobbyCacheRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getOnlineTotalOnline(): Promise<number> {
    const onlineTotal = await this.cache.get<number>('lobby:onlineTotal');
    return onlineTotal;
  }

  async setOnlineTotalOnline(onlineTotal: number): Promise<void> {
    await this.cache.set('lobby:onlineTotal', onlineTotal, this.getTttl());
  }

  private getTttl(): number {
    return Number(envs.LOBBY_TTL);
  }
}
