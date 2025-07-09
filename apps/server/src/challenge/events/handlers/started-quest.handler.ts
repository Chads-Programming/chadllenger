import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartedQuestEvent } from '../impl/started-quest.event';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { ChadLogger } from '@/logger/chad-logger';

@EventsHandler(StartedQuestEvent)
export class StartedQuestEventHandler
  implements IEventHandler<StartedQuestEvent>
{
  constructor(
    private readonly challengeQueue: ChallengeQueueService,
    private readonly logger: ChadLogger,
  ) {}

  handle(event: StartedQuestEvent) {
    this.logger.log(
      'Adding finish quest to queue',
      'StartedQuestEventHandler::handle',
      {
        codename: event.codename,
        questId: event.questId,
      },
    );
    this.challengeQueue.addFinishQuestToQueue(event.codename);
  }
}
