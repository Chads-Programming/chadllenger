import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { envs } from '@/config/envs';
import * as cookie from 'cookie';

export type AuthenticatedSocket = Socket & {
  auth: { userId: string };
};

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private server: Server;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: `redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`,
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  create(port: number, options?: ServerOptions): Server {
    const server = super.create(port, options);

    this.server = server;

    this.server.use(async (socket: AuthenticatedSocket, next) => {
      const cookieHeader = socket.handshake.headers.cookie;
      const cookies = cookie.parse(cookieHeader || '');
      const userId = cookies.sessionId;

      if (!userId) {
        socket.auth = null;
        return next(new Error('userId missing in cookie'));
      }

      try {
        socket.auth = {
          userId,
        };

        return next();
      } catch (e) {
        return next(e);
      }
    });

    return this.server;
  }
}
