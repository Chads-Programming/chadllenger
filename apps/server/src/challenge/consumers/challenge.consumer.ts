import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CHALLENGE_EVENTS, CHALLENGE_QUEUE } from '../consts';
import { ChallengeService } from '../services/challenge.service';
import { ChadLogger } from '@/logger/chad-logger';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor(CHALLENGE_QUEUE.NAME)
export class ChallengeConsumer extends WorkerHost {
  constructor(
    private readonly challengeService: ChallengeService,
    private readonly logger: ChadLogger,
    private readonly eventEmitter: EventEmitter2,
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
      const updatedChallenge =
        await this.challengeService.finishChallenge(challengeCodename);

      this.eventEmitter.emit(
        CHALLENGE_EVENTS.CHALLENGE_FINISHED,
        updatedChallenge,
      );
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
