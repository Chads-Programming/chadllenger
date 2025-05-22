import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartedQuestEvent } from '../impl/started-quest.event';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';

@EventsHandler(StartedQuestEvent)
export class StartedQuestEventHandler
  implements IEventHandler<StartedQuestEvent>
{
  constructor(private readonly challengeQueue: ChallengeQueueService) {}

  handle(event: StartedQuestEvent) {
    throw new Error('Method not implemented.');
  }
}
