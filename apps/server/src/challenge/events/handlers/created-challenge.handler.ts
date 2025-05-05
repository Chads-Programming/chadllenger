import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChallengeEvent } from '../impl/created-challenge.event';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';

@EventsHandler(CreatedChallengeEvent)
export class CreatedChallengeEventHandler
  implements IEventHandler<CreatedChallengeEvent>
{
  constructor(private readonly challengeQueue: ChallengeQueueService) {}

  async handle(event: CreatedChallengeEvent) {
    await this.challengeQueue.finishChallengeToQueue(event.codename);
  }
}
