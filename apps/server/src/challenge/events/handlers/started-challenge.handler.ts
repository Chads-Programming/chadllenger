import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartedChallengeEvent } from '../impl/started-challenge.event';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { ChadLogger } from '@/logger/chad-logger';

@EventsHandler(StartedChallengeEvent)
export class StartedChallengeEventHandler
  implements IEventHandler<StartedChallengeEvent>
{
  constructor(
    private readonly challengeQueue: ChallengeQueueService,
    private readonly logger: ChadLogger,
  ) {}

  async handle(event: StartedChallengeEvent) {
    this.logger.log(
      '[DEPRECATED] Calling: setupAutoQuestToQueue',
      'StartedChallengeEventHandler::handle',
      event.codename,
    );

    // await this.challengeQueue.setupAutoQuestToQueue(event.codename);
  }
}
