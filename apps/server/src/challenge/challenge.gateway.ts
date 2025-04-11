import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  ChallengeEvents,
  ChallengeNotification,
  CreateChallenge,
  MessageTypes,
} from '@repo/schemas';
import { Server, Socket } from 'socket.io';
import { ChallengeService } from './challenge.service';

@WebSocketGateway({
  namespace: 'challenge',
  transports: ['websocket'],
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

    this.server
      .to(client.id)
      .emit(
        ChallengeEvents.NOTIFICATIONS,
        ChallengeNotification.buildCreatedRoomNotification(challenge.codename),
      );
  }

  private getConnectedSockets() {
    return this.server.of('/').sockets.size;
  }

  private emitTotalOnlinePlayers() {
    this.server.emit(
      ChallengeEvents.PLAYERS,
      ChallengeNotification.buildPlayersNotification(
        this.getConnectedSockets(),
      ),
    );
  }
}
