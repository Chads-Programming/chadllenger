import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { envs } from './envs';

export const cacheOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    return {
      stores: [new KeyvRedis(`redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`)],
    };
  },
};
