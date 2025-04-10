import { Injectable } from '@nestjs/common';
import { ChallengeCacheRepository } from './challenge-cache.repository';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeCacheRepository) {}

  createChallenge() {}
  addPartipant() {}
  removeParticipant() {}
  updateParticipantScore() {}
  updateCodeChallenge() {}
}
