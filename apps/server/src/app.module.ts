import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheOptions } from './config/cache';
import { DatabaseModule } from './database/database.module';
import { ChallengeModule } from './challenge/challenge.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    CacheModule.registerAsync(cacheOptions),
    DatabaseModule,
    ChallengeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
