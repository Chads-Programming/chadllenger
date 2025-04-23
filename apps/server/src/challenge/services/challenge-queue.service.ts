import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CHALLENGE_QUEUE } from '../consts';
import { envs } from '@/config/envs';

@Injectable()
export class ChallengeQueueService {
  constructor(
    @InjectQueue(CHALLENGE_QUEUE.NAME) private challengeQueue: Queue,
  ) {}

  finishChallengeToQueue(challengeId: string) {
    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.FINISH_CHALLENGE,
      challengeId,
      this.getQueueOptions(),
    );
  }

  private getQueueOptions() {
    const challengeTTL = Number(envs.CHALLENGE_TTL);

    return {
      attempts: 3,
      delay: challengeTTL,
      backoff: {
        type: 'fixed',
        delay: challengeTTL / 10,
      },
    };
  }
}
