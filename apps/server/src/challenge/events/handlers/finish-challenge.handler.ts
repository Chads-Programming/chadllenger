import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { FinishedQuesEvent } from '../impl/finished-quest.event';
import { FinishedChallengeEvent } from '../impl/finished-challente.event';

@EventsHandler(FinishedChallengeEvent)
export class FinishedChallengeEventHandler
  implements IEventHandler<FinishedQuesEvent>
{
  constructor(private readonly challengeQueue: ChallengeQueueService) {}

  async handle(event: FinishedQuesEvent) {
    return this.challengeQueue.stopAutoQuestSetup(event.codename);
  }
}
