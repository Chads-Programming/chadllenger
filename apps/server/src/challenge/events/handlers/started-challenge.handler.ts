import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartedChallengeEvent } from '../impl/started-challenge.event';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';

@EventsHandler(StartedChallengeEvent)
export class StartedChallengeEventHandler
  implements IEventHandler<StartedChallengeEvent>
{
  constructor(private readonly challengeQueue: ChallengeQueueService) {}

  async handle(event: StartedChallengeEvent) {
    await Promise.all([
      this.challengeQueue.setupAutoQuestToQueue(event.codename),
      this.challengeQueue.finishChallengeToQueue(event.codename),
    ]);
  }
}
