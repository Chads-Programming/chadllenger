import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';
import { AI_QUEUE, CHALLENGE_QUEUE } from '../consts';
import { envs } from '@/config/envs';
import { WithId } from '@/types/with-id.type';
import { IGeneratedQuizChallenge } from '@repo/schemas';

@Injectable()
export class ChallengeQueueService {
  constructor(
    @InjectQueue(CHALLENGE_QUEUE.NAME) private challengeQueue: Queue,
    @InjectQueue(AI_QUEUE.NAME) private aiQueue: Queue,
  ) {}

  setupAutoQuestToQueue(challengeId: string) {
    const questTTL = Number(envs.QUEST_TTL);

    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.SETUP_AUTO_QUEST,
      challengeId,
      {
        ...this.getQueueOptions(),
        delay: questTTL,
        repeat: {
          every: questTTL,
          limit: 1,
        },
        backoff: {
          type: 'fixed',
          delay: 3000,
        },
      },
    );
  }

  finishChallengeToQueue(codename: string) {
    const challengeTTL = Number(envs.CHALLENGE_TTL);

    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.FINISH_CHALLENGE,
      codename,
      {
        ...this.getQueueOptions(),
        delay: challengeTTL,
        backoff: {
          type: 'fixed',
          delay: challengeTTL / 10,
        },
      },
    );
  }

  generateChallengeToQueue(challengeId: string) {
    return this.aiQueue.add(AI_QUEUE.JOBS.GENERATE_CHALLENGE, challengeId, {
      ...this.getQueueOptions(),
      attempts: 1,
    });
  }

  generatedChallengeToQueue(challenge: WithId<IGeneratedQuizChallenge>) {
    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.GENERATED_CHALLENGE,
      challenge,
      this.getQueueOptions(),
    );
  }

  startNextQuestToQueue(codename: string) {
    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.START_NEXT_QUEST,
      codename,
      {
        ...this.getQueueOptions(),
        delay: Number(envs.NEXT_QUEST_TTL),
      },
    );
  }

  private getQueueOptions(): JobsOptions {
    return {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    };
  }
}
