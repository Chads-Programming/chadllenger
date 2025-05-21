import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AI_EVENTS, CHALLENGE_QUEUE } from '../consts';
import { ChadLogger } from '@/logger/chad-logger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FinishChallengeCommand } from '../commands/impl/finish-challenge.command';
import { IGeneratedQuizChallenge, IQuestQuizChallenge } from '@repo/schemas';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateQuizzChallengeCommand } from '../commands/impl/update-quizz-challenge.command';
import { WithId } from '@/types/with-id.type';
import { GetChallengeQuery } from '../queries/impl/get-challenge.query';
import { FinishQuestCommand } from '../commands/impl/finish-quest.command';

@Processor(CHALLENGE_QUEUE.NAME)
export class ChallengeConsumer extends WorkerHost {
  constructor(
    private readonly logger: ChadLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async process(job: Job<any, void, string>): Promise<void> {
    if (job.name === CHALLENGE_QUEUE.JOBS.FINISH_CHALLENGE) {
      return this.processFinishChallenge(job);
    }
    if (job.name === CHALLENGE_QUEUE.JOBS.GENERATED_CHALLENGE) {
      return this.processGeneratedChallenge(job);
    }
    if (job.name === CHALLENGE_QUEUE.JOBS.SETUP_AUTO_QUEST) {
      return this.processSetupAutoQuest(job);
    }
    if (job.name === CHALLENGE_QUEUE.JOBS.START_NEXT_QUEST) {
      return this.processNextQuest(job);
    }
  }

  async processGeneratedChallenge(
    job: Job<WithId<IGeneratedQuizChallenge>, void, string>,
  ): Promise<void> {
    const { data } = job;
    const challenge = await this.queryBus.execute(
      new GetChallengeQuery(data.id),
    );

    if (!challenge) throw new Error('Challenge not found');

    const challenges: IQuestQuizChallenge[] = data.questions.map(
      (question) => ({
        id: question.id,
        createdAt: new Date(),
        question,
      }),
    );

    const res = await this.commandBus.execute(
      new UpdateQuizzChallengeCommand({
        ...challenge,
        challenges,
      }),
    );

    this.eventEmitter.emit(AI_EVENTS.CHALLENGE_GENERATED, res);
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

  async processSetupAutoQuest(job: Job<string, void, string>): Promise<void> {
    const challengeCodename = job.data;

    try {
      await this.commandBus.execute(new FinishQuestCommand(challengeCodename));
    } catch (error) {
      this.logger.error(
        error,
        null,
        'ChallengeConsumer::processSetupAutoQuest',
      );
      throw error;
    }
  }

  async processNextQuest(job: Job<string, void, string>): Promise<void> {
    const challengeCodename = job.data;

    try {
      // TODO: Setup the next quest Command
      await this.commandBus.execute(new FinishQuestCommand(challengeCodename));
    } catch (error) {
      this.logger.error(error, null, 'ChallengeConsumer::processNextQuest');
      throw error;
    }
  }
}
