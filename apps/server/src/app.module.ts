import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheOptions } from './config/cache';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CacheModule.registerAsync(cacheOptions), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
