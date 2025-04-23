import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CHALLENGE_QUEUE } from '../consts';
import { ChallengeService } from '../services/challenge.service';
import { ChadLogger } from '@/logger/chad-logger';

@Processor(CHALLENGE_QUEUE.NAME)
export class ChallengeConsumer extends WorkerHost {
  constructor(
    private readonly challengeService: ChallengeService,
    private readonly logger: ChadLogger,
  ) {
    super();
  }

  async process(job: Job<string, void, string>): Promise<void> {
    if (job.name === CHALLENGE_QUEUE.JOBS.FINISH_CHALLENGE) {
      return this.processFinishChallenge(job);
    }
  }

  async processFinishChallenge(job: Job<string, void, string>): Promise<void> {
    const challengeCodename = job.data;

    try {
      await this.challengeService.finishChallenge(challengeCodename);
    } catch (error) {
      this.logger.error(
        error,
        null,
        'ChallengeConsumer::processFinishChallenge',
      );
      throw error;
    }
  }
}
