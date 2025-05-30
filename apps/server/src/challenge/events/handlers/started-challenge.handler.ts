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
      'Preparing auto quest to queue',
      'StartedChallengeEvent::handle',
      event.codename,
    );

    await Promise.all([
      this.challengeQueue.setupAutoQuestToQueue(event.codename),
    ]);
  }
}
