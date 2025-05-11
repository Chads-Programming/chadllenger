import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CqrsModule } from '@nestjs/cqrs';

import { cacheOptions } from './config/cache';
import { DatabaseModule } from './database/database.module';
import { ChallengeModule } from './challenge/challenge.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bullmq';
import { envs } from './config/envs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    CacheModule.registerAsync(cacheOptions),
    DatabaseModule,
    ChallengeModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
    CqrsModule.forRoot(),
    AiModule,
    BullModule.forRoot({
      connection: {
        host: envs.REDIS_HOST,
        port: Number(envs.REDIS_PORT),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
