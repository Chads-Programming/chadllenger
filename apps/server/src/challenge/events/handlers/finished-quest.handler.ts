import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { FinishedQuesEvent } from '../impl/finished-quest.event';

@EventsHandler(FinishedQuesEvent)
export class FinishedQuestEventHandler
  implements IEventHandler<FinishedQuesEvent>
{
  constructor(private readonly challengeQueue: ChallengeQueueService) {}

  async handle(event: FinishedQuesEvent) {
    return this.challengeQueue.startNextQuestToQueue(event.codename);
  }
}
