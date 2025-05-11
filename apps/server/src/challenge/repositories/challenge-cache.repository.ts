import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { envs } from '@/config/envs';
import {
  CreateChallengeRequestType,
  UpdateChallengeRequestType,
} from '../types/challenge-store';
import { ErrorCodes } from '@/lib/errors';
import { ChallengeStateBuilder } from '../models/challenge-state.model';
import { generateUniqueId } from '@/utils/unique-id';

@Injectable()
export class ChallengeCacheRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async createChallenge(
    challenge: CreateChallengeRequestType,
  ): Promise<ChallengeStateBuilder> {
    const id = generateUniqueId();

    const newChallenge = new ChallengeStateBuilder()
      .setId(id)
      .setTitle(challenge.title)
      .setCreator(challenge.creator)
      .setStatus(challenge.status)
      .setExpiration(challenge.expiration)
      .setChallenges(challenge.challenges)
      .setParticipants(challenge.participants)
      .setDifficulties(challenge.difficulties)
      .setType(challenge.type);

    const challengeKey = this.getKey(newChallenge.codename);

    await this.cache.set(
      challengeKey,
      newChallenge.serialize(),
      Number(envs.CHALLENGE_TTL),
    );

    return newChallenge;
  }

  async updateChallenge(
    codename: string,
    challenge: UpdateChallengeRequestType,
  ) {
    const key = this.getKey(codename);
    const ttl = await this.cache.ttl(key);

    const currentChallenge = await this.findChallengeByCodename(codename);

    if (!currentChallenge) {
      throw ErrorCodes.CHALLENGE_NOT_FOUND;
    }

    const updatedChallenge = ChallengeStateBuilder.fromProps({
      ...currentChallenge,
      ...challenge,
    });

    await this.cache.set(key, updatedChallenge.serialize(), ttl);
  }

  async findChallengeByCodename(
    codename: string,
  ): Promise<ChallengeStateBuilder> {
    const key = this.getKey(codename);
    const challenge = await this.cache.get<string>(key);

    return ChallengeStateBuilder.fromProps(JSON.parse(challenge));
  }

  private getKey(id: string) {
    return `challenge:${id}`;
  }
}
