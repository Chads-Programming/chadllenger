import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { envs } from './envs';

export const cacheOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    return {
      stores: [createKeyv(`redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`)],
    };
  },
};
