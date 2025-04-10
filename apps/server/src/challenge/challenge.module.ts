import { Module } from '@nestjs/common';
import { ChallengeGateway } from './challenge.gateway';
import { ChallengeCacheRepository } from './challenge-cache.repository';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [],
  providers: [ChallengeGateway, ChallengeCacheRepository, ChallengeService],
  controllers: [],
})
export class ChallengeModule {}
