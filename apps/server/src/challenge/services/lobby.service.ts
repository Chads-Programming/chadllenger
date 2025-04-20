import { Injectable } from '@nestjs/common';
import { LobbyCacheRepository } from '../repositories/lobby-cache.repository';

@Injectable()
export class LobbyService {
  constructor(private readonly lobbyCacheRepository: LobbyCacheRepository) {}

  async getOnlineTotalOnline(): Promise<number> {
    const onlineTotal = await this.lobbyCacheRepository.getOnlineTotalOnline();
    return onlineTotal;
  }

  async setOnlineTotalOnline(onlineTotal: number): Promise<void> {
    await this.lobbyCacheRepository.setOnlineTotalOnline(onlineTotal);
  }
}
