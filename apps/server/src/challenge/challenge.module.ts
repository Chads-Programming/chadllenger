import { Module } from '@nestjs/common';
import { ChallengeGateway } from './challenge.gateway';
import { ChallengeCacheRepository } from './repositories/challenge-cache.repository';
import { ChallengeService } from './services/challenge.service';
import { LobbyController } from './controllers/lobby.controller';
import { LobbyCacheRepository } from './repositories/lobby-cache.repository';
import { LobbyService } from './services/lobby.service';
import { ChallengeController } from './controllers/challenge.controller';
import { BullModule } from '@nestjs/bullmq';
import { CHALLENGE_QUEUE } from './consts';
import { ChallengeQueueService } from './services/challenge-queue.service';
import { ChallengeConsumer } from './consumers/challenge.consumer';
import { PlayerCacheRepository } from './repositories/player-cache.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CHALLENGE_QUEUE.NAME,
    }),
  ],
  providers: [
    ChallengeGateway,
    ChallengeCacheRepository,
    PlayerCacheRepository,
    LobbyCacheRepository,
    ChallengeService,
    LobbyService,
    ChallengeQueueService,
    ChallengeConsumer,
  ],
  controllers: [LobbyController, ChallengeController],
})
export class ChallengeModule {}
