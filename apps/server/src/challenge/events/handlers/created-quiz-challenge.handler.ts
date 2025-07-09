import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { CreatedQuizChallengeEvent } from '../impl/created-quiz-challenge.event';

@EventsHandler(CreatedQuizChallengeEvent)
export class CreatedQuizChallengeEventHandler
  implements IEventHandler<CreatedQuizChallengeEvent>
{
  constructor(private readonly challengeQueue: ChallengeQueueService) {}

  async handle(event: CreatedQuizChallengeEvent) {
    await this.challengeQueue.generateChallengeToQueue(event.codename);
  }
}
