import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { GeneratedChallengeEvent } from '../impl/generated-challenge.event';

@EventsHandler(GeneratedChallengeEvent)
export class GeneratedChallengeEventHandler
  implements IEventHandler<GeneratedChallengeEvent> {
  constructor(private readonly challengeQueue: ChallengeQueueService) { }

  async handle(event: GeneratedChallengeEvent) {
    
    await this.challengeQueue.generatedChallengeToQueue(event.challenge);
  }
}
