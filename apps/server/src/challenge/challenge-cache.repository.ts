import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ChallengeState } from './types/challenge-state';
import { envs } from '@/config/envs';
import {
  CreateChallengeStore,
  UpdateChallengeStore,
} from './types/challenge-store';
import * as codeGenerator from '@/utils/code-generator';
import { ErrorCodes } from '@/lib/errors';

const CODENAME_SIZE = 6;

@Injectable()
export class ChallengeCacheRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async createChallenge(
    challenge: CreateChallengeStore,
  ): Promise<ChallengeState> {
    const id = uuidv4();
    const codename = codeGenerator.generateCode(CODENAME_SIZE);
    const challengeKey = this.getKey(codename);

    const newChallenge: ChallengeState = {
      ...challenge,
      id,
      codename,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.cache.set(
      challengeKey,
      JSON.stringify(newChallenge),
      Number(envs.CHALLENGE_TTL),
    );

    return newChallenge;
  }

  async updateChallenge(codename: string, challenge: UpdateChallengeStore) {
    const key = this.getKey(codename);
    const ttl = await this.cache.ttl(key);

    const currentChallenge = await this.findChallengeByCodename(codename);

    if (!currentChallenge) {
      throw ErrorCodes.CHALLENGE_NOT_FOUND;
    }

    const parsedUpdatedChallenge = JSON.stringify({
      ...currentChallenge,
      ...challenge,
    });

    await this.cache.set(key, parsedUpdatedChallenge, ttl);
  }

  async findChallengeByCodename(codename: string): Promise<ChallengeState> {
    const key = this.getKey(codename);
    const challenge = await this.cache.get<string>(key);

    return JSON.parse(challenge);
  }

  private getKey(id: string) {
    return `challenge:${id}`;
  }
}
