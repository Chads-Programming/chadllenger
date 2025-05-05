import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CHALLENGE_QUEUE } from '../consts';
import { ChadLogger } from '@/logger/chad-logger';
import { CommandBus } from '@nestjs/cqrs';
import { FinishChallengeCommand } from '../commands/impl/finish-challenge.command';

@Processor(CHALLENGE_QUEUE.NAME)
export class ChallengeScheduler extends WorkerHost {
  constructor(
    private readonly logger: ChadLogger,
    private readonly commandBus: CommandBus,
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
      await this.commandBus.execute(
        new FinishChallengeCommand(challengeCodename),
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
