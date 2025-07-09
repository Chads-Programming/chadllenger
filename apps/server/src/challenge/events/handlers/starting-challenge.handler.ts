import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { ChadLogger } from '@/logger/chad-logger';
import { StartingChallengeEvent } from '../impl/starting-challenge.event';

@EventsHandler(StartingChallengeEvent)
export class StartingChallengeEventHandler
  implements IEventHandler<StartingChallengeEvent>
{
  constructor(
    private readonly challengeQueue: ChallengeQueueService,
    private readonly logger: ChadLogger,
  ) {}

  async handle(event: StartingChallengeEvent) {
    this.logger.log(
      'Preparing starting challenge to queue',
      'StartingChallengeEventHandler::handle',
      event.codename,
    );

    await this.challengeQueue.preparingToStartToQueue(event.codename);
  }
}
