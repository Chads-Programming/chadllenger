import { Module } from '@nestjs/common';
import { ChallengeGateway } from './challenge.gateway';
import { ChallengeCacheRepository } from './repositories/challenge-cache.repository';
import { LobbyController } from './controllers/lobby.controller';
import { LobbyCacheRepository } from './repositories/lobby-cache.repository';
import { ChallengeController } from './controllers/challenge.controller';
import { BullModule } from '@nestjs/bullmq';
import { AI_QUEUE, CHALLENGE_QUEUE } from './consts';
import { ChallengeQueueService } from './services/challenge-queue.service';
import { ChallengeConsumer } from './consumers/challenge.consumer';
import { PlayerCacheRepository } from './repositories/player-cache.repository';

import CommandHandlers from './commands/handlers';
import QueryHandlers from './queries/handlers';
import EventHandlers from './events/handlers';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CHALLENGE_QUEUE.NAME,
    }),
    BullModule.registerQueue({
      name: AI_QUEUE.NAME,
    }),
  ],
  providers: [
    ChallengeGateway,
    ChallengeCacheRepository,
    PlayerCacheRepository,
    LobbyCacheRepository,
    ChallengeQueueService,
    ChallengeConsumer,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  controllers: [LobbyController, ChallengeController],
})
export class ChallengeModule {}
