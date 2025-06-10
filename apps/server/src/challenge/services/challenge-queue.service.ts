import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';
import { AI_QUEUE, CHALLENGE_QUEUE } from '../consts';
import { envs } from '@/config/envs';
import { WithId } from '@/types/with-id.type';
import { IGeneratedQuizChallenge } from '@repo/schemas';
import { ChadLogger } from '@/logger/chad-logger';

@Injectable()
export class ChallengeQueueService {
  constructor(
    @InjectQueue(CHALLENGE_QUEUE.NAME) private challengeQueue: Queue,
    @InjectQueue(AI_QUEUE.NAME) private aiQueue: Queue,
    private readonly logger: ChadLogger,
  ) {}

  prepareAutoQuestToQueue(codename: string) {
    this.logger.log(
      'Preparing auto quest to queue',
      'ChallengeQueueService::prepareAutoQuestToQueue',
      { codename, delay: envs.QUEST_TTL },
    );
    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.PREPARE_START_CHALLENGE,
      codename,
      {
        ...this.getQueueOptions(),
        jobId: this.getJobIdPreparingAutoSetupQuest(codename),
        delay: Number(envs.QUEST_TTL),
        backoff: {
          type: 'fixed',
          delay: 3000,
        },
      },
    );
  }

  setupAutoQuestToQueue(codename: string) {
    const questTTL = Number(envs.QUEST_TTL);

    this.logger.log(
      'Setting up auto quest to queue',
      'ChallengeQueueService::setupAutoQuestToQueue',
      { codename, delay: questTTL },
    );

    return this.challengeQueue.add(
      CHALLENGE_QUEUE.JOBS.SETUP_AUTO_QUEST,
      codename,
      {
        ...this.getQueueOptions(),
        jobId: this.getJobIdAutoSetupQuest(codename),
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

  stopAutoQuestSetup(codename: string) {
    return this.challengeQueue.removeJobScheduler(
      this.getJobIdAutoSetupQuest(codename),
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

  private getJobIdAutoSetupQuest(codename: string): string {
    return `${codename}:${CHALLENGE_QUEUE.JOBS.SETUP_AUTO_QUEST}`;
  }

  private getJobIdPreparingAutoSetupQuest(codename: string): string {
    return `preparing:${codename}`;
  }
}
