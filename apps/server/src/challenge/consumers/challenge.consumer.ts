import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AI_EVENTS, CHALLENGE_QUEUE } from '../consts';
import { ChadLogger } from '@/logger/chad-logger';
import { CommandBus } from '@nestjs/cqrs';
import { FinishChallengeCommand } from '../commands/impl/finish-challenge.command';
import { IGeneratedQuizChallenge } from '@repo/schemas';
import { ChallengeGateway } from '../challenge.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor(CHALLENGE_QUEUE.NAME)
export class ChallengeConsumer extends WorkerHost {
  constructor(
    private readonly logger: ChadLogger,
    private readonly commandBus: CommandBus,
    private readonly challengeWs: ChallengeGateway,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }

  async process(job: Job<any, void, string>): Promise<void> {
    if (job.name === CHALLENGE_QUEUE.JOBS.FINISH_CHALLENGE) {
      return this.processFinishChallenge(job);
    }
    if (job.name === CHALLENGE_QUEUE.JOBS.GENERATED_CHALLENGE) {
      return this.processGeneratedChallenge(job);
    }
  }

  async processGeneratedChallenge(job: Job<IGeneratedQuizChallenge, void, string>): Promise<void> {
    const { data } = job;
    this.eventEmitter.emit(AI_EVENTS.CHALLENGE_GENERATED, data);
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
