import { Module } from '@nestjs/common';
import { ChallengeGateway } from './challenge.gateway';
import { ChallengeCacheRepository } from './repositories/challenge-cache.repository';
import { ChallengeService } from './services/challenge.service';
import { LobbyController } from './controllers/lobby.controller';
import { LobbyCacheRepository } from './repositories/lobby-cache.repository';
import { LobbyService } from './services/lobby.service';

@Module({
  imports: [],
  providers: [
    ChallengeGateway,
    ChallengeCacheRepository,
    LobbyCacheRepository,
    ChallengeService,
    LobbyService,
  ],
  controllers: [LobbyController],
})
export class ChallengeModule {}
