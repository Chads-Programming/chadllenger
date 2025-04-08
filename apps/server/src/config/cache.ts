import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { envs } from './envs';

export const cacheOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: envs.REDIS_HOST,
        port: envs.REDIS_PORT,
      },
    });
    return {
      store: () => store,
    };
  },
};
