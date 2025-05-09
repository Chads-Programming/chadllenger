import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: envs.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  });

  const redisIoAdapter = new RedisIoAdapter(app);

  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(envs.PORT);
}
bootstrap();
