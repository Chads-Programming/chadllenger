import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { envs } from '@/config/envs';
import * as cookie from 'cookie';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: `redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`,
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: true,
        credentials: true,
      },
    });

    server.adapter(this.adapterConstructor);

    server.use((socket: Socket, next) => {
      const cookieHeader = socket.handshake.headers.cookie;
      const cookies = cookie.parse(cookieHeader || '');
      const userId = cookies.userId;

      if (!userId) {
        return next(new Error('userId missing in cookie'));
      }

      socket.data.userId = userId;
      return next();
    });

    return server;
  }
}
