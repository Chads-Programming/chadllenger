import { LobbyService } from './services/lobby.service';
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
import { ChallengeService } from './services/challenge.service';
import { ChallengeNotificationBuilder } from '@/core/notification-builder';
import {
  MessageTypes,
  CreateChallenge,
  NotificationsChannels,
} from '@repo/schemas';
import { envs } from '@/config/envs';
import { WsCustomExceptionFilter } from '@/exception-filters/ws-custom-exception-filter';
import { UseFilters } from '@nestjs/common';
import { ChadLogger } from '@/logger/chad-logger';

@UseFilters(WsCustomExceptionFilter)
@WebSocketGateway({
  namespace: 'challenge',
  transports: ['websocket'],
  cors: {
    origin: envs.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
})
export class ChallengeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly lobbyService: LobbyService,
    private readonly logger: ChadLogger,
  ) {}

  handleConnection() {
    this.handleSocketConnection();
  }
  handleDisconnect() {
    this.handleSocketConnection();
  }

  /**
   * Handles the creation of a challenge room. This method is triggered when a client
   * requests to create a new challenge room. It performs the following actions:
   * - Creates a new challenge using the provided data and the client's ID.
   * - Joins the client to the newly created challenge room.
   * - Builds and sends a notification to the client about the created room.
   *
   * @param data - The data required to create a challenge, provided by the client.
   * @param client - The socket instance of the connected client.
   * @returns A notification object containing details about the created challenge room.
   */
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

    this.server
      .to(client.id)
      .emit(NotificationsChannels.CHALLENGE_NOTIFICATIONS, notification);

    return notification;
  }

  /**
   * Handles a new socket connection event.
   * Updates the total number of connected sockets and notifies all clients
   * about the current number of players online.
   *
   * This method retrieves the total number of connected sockets, updates the
   * lobby service with the current online total, and emits a notification
   * to all connected clients with the updated player information.
   */
  private async handleSocketConnection() {
    const onlineTotal = this.getConnectedSockets();

    this.logger.log(
      'Client connected 🦊🚬',
      'ChallengeGateway::handleSocketConnection',
      {
        onlineTotal,
      },
    );

    await this.lobbyService.setOnlineTotalOnline(onlineTotal);

    this.server.emit(
      NotificationsChannels.LOBBY_NOTIFICATIONS,
      ChallengeNotificationBuilder.buildPlayersNotification(onlineTotal),
    );
  }

  /**
   * Retrieves the number of currently connected sockets to the server.
   *
   * @returns The total number of connected sockets.
   */
  private getConnectedSockets() {
    return (this.server.sockets as unknown as { size: number }).size;
  }
}
