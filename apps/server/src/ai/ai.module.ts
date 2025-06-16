import { Module } from '@nestjs/common';
import { AI_QUEUE, CHALLENGE_QUEUE } from '@/challenge/consts';
import { BullModule } from '@nestjs/bullmq';
import { AIConsumer } from './consumers/ai.consumer';
import { GenerateChallengeHandler } from './commands/handlers/generate-challenge.handler';
import { GeneratedChallengeEventHandler } from './events/handlers/generated-challenge.handler';
import { ChallengeQueueService } from '@/challenge/services/challenge-queue.service';
import { OpenaiService } from './services/openai.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: AI_QUEUE.NAME,
    }),
    BullModule.registerQueue({
      name: CHALLENGE_QUEUE.NAME,
    }),
  ],
  providers: [
    GenerateChallengeHandler,
    AIConsumer,
    OpenaiService,
    GeneratedChallengeEventHandler,
    ChallengeQueueService,
  ],
  exports: [],
})
export class AiModule {}
