import { Status } from './types/challenge-state';
import { ParticipantModel } from './models/participant.model';
import { CodeChallengeRepository } from './../database/repositories/code-challenge.repository';
import { Injectable } from '@nestjs/common';
import { ChallengeCacheRepository } from './challenge-cache.repository';
import { CreateChallenge } from '@repo/schemas';
import { CreateChallengeRequestType } from './types/challenge-store';
import { CodeChallengeStateModel } from './models/code-challenge.model';
import { envs } from '@/config/envs';

const CODE_CHALLENGES_SIZE = 3;
const CHALLENGE_EXPIRATION_TIME = Math.ceil(Number(envs.CHALLENGE_TTL) / 2);

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly codeChallengeRepository: CodeChallengeRepository,
  ) {}

  async createChallenge(creatorId: string, createChallenge: CreateChallenge) {
    const challenges =
      await this.codeChallengeRepository.getRandomChallengesByDifficult(
        createChallenge.difficulties,
        CODE_CHALLENGES_SIZE,
      );

    const codeChallenges = challenges.map(
      (codeChallenge) => new CodeChallengeStateModel(codeChallenge.id),
    );

    const creatorParticpant = new ParticipantModel(
      creatorId,
      createChallenge.creatorName,
    );

    const challengeStore: CreateChallengeRequestType = {
      creator: creatorId,
      participants: [creatorParticpant],
      codeChallenges,
      status: Status.PENDING,
      expiration: CHALLENGE_EXPIRATION_TIME,
    };

    // TODO: Send queue to updated FINISHED according expiration time
    return this.challengeRepository.createChallenge(challengeStore);
  }
  addPartipant() {}
  removeParticipant() {}
  updateParticipantScore() {}
  updateCodeChallenge() {}
}
