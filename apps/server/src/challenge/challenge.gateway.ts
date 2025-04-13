import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChallengeService } from './challenge.service';
import { ChallengeNotificationBuilder } from '@/core/notification-builder';
import { MessageTypes, CreateChallenge, ChallengeEvents } from '@repo/schemas';

@WebSocketGateway({
  namespace: 'challenge',
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChallengeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  constructor(private readonly challengeService: ChallengeService) {}

  handleConnection() {
    this.emitTotalOnlinePlayers();
  }
  handleDisconnect() {
    this.emitTotalOnlinePlayers();
  }

  @SubscribeMessage(MessageTypes.CREATE_ROOM)
  async createChallengeRoom(
    @MessageBody() data: CreateChallenge,
    @ConnectedSocket() client: Socket,
  ) {
    const challenge = await this.challengeService.createChallenge(
      client.id,
      data,
    );

    client.join(challenge.codename);

    const notification =
      ChallengeNotificationBuilder.buildCreatedRoomNotification(
        challenge.codename,
      );

    this.server.to(client.id).emit(ChallengeEvents.NOTIFICATIONS, notification);

    return notification;
  }

  private getConnectedSockets() {
    return (this.server.sockets as unknown as { size: number }).size;
  }

  private emitTotalOnlinePlayers() {
    this.server.emit(
      ChallengeEvents.PLAYERS,
      ChallengeNotificationBuilder.buildPlayersNotification(
        this.getConnectedSockets(),
      ),
    );
  }
}
