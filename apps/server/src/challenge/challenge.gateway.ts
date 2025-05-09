import { GetPlayerChallengeQuery } from './queries/impl/get-player-challenge.query';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChallengeNotificationBuilder } from '@/core/notification-builder';
import {
  MessageTypes,
  CreateChallenge,
  NotificationsChannels,
  JoinChallengeRoom,
} from '@repo/schemas';
import { envs } from '@/config/envs';
import { WsCustomExceptionFilter } from '@/exception-filters/ws-custom-exception-filter';
import { UseFilters } from '@nestjs/common';
import { ChadLogger } from '@/logger/chad-logger';
import { ChallengeQueueService } from './services/challenge-queue.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ChallengeStateBuilder } from './models/challenge-state.model';
import { CHALLENGE_EVENTS } from './consts';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateChallengeCommand } from './commands/impl/create-challenge.comand';
import { UpdateOnlineCountCommand } from './commands/impl/update-online-count.command';
import { JoinChallengeCommand } from './commands/impl/join-challenge.command';
import { AuthenticatedSocket } from '@/adapters/redis-io.adapter';

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
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly challengeQueue: ChallengeQueueService,
    private readonly logger: ChadLogger,
  ) {}

  handleConnection(client: AuthenticatedSocket) {
    this.handleGeneralConnection();
    this.handleRejoinChallenge(client);
  }
  handleDisconnect() {
    this.handleGeneralConnection();
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
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const challenge = await this.commandBus.execute(
      new CreateChallengeCommand(client.auth.userId, data),
    );

    client.join(challenge.codename);

    const notification =
      ChallengeNotificationBuilder.buildCreatedRoomNotification(
        challenge.codename,
      );

    this.server
      .to(client.auth.userId)
      .emit(NotificationsChannels.CHALLENGE_NOTIFICATIONS, notification);

    this.challengeQueue.finishChallengeToQueue(challenge.codename);

    return notification;
  }

  /**
   * Handles a client request to join a challenge room. This method adds the participant
   * to the challenge, joins the client to the corresponding room, and notifies all
   * participants in the room about the new participant.
   *
   * @param data - The data required to join the challenge room, including the challenge codename
   *               and the username of the participant.
   * @param client - The connected socket client making the request.
   * @returns A notification object indicating that the participant has joined the challenge.
   *
   * @throws Will throw an error if adding the participant to the challenge fails.
   */
  @SubscribeMessage(MessageTypes.JOIN_CHALLENGE_ROOM)
  async joinChallengeRoom(
    @MessageBody() joinPayload: JoinChallengeRoom,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    this.logger.log(
      'Start joining to room',
      'ChallengeGateway::joinChallengeRoom',
      joinPayload,
    );

    const response = await this.commandBus.execute(
      new JoinChallengeCommand({
        challengeCodename: joinPayload.codename,
        participantId: client.auth.userId,
        participantName: joinPayload.username,
      }),
    );

    const participant = response.participant;

    client.join(joinPayload.codename);

    const notification =
      ChallengeNotificationBuilder.joinedChallengeNotification(
        participant.id,
        participant.name,
      );

    this.server
      .to(joinPayload.codename)
      .emit(NotificationsChannels.CHALLENGE_NOTIFICATIONS, notification);

    return notification;
  }

  /**
   * Notifies all connected clients in the specified challenge room that the challenge has been finished.
   *
   * @param challenge - The state model of the challenge containing details such as the codename
   *                    used to identify the challenge room and other relevant information.
   *
   * Emits:
   * - A notification to the `NotificationsChannels.CHALLENGE_NOTIFICATIONS` channel
   *   with a payload built using `ChallengeNotificationBuilder.buildFinishChallengeNotification`.
   */
  @OnEvent(CHALLENGE_EVENTS.CHALLENGE_FINISHED)
  async finishChallenge(challenge: ChallengeStateBuilder) {
    this.server
      .to(challenge.codename)
      .emit(
        NotificationsChannels.CHALLENGE_NOTIFICATIONS,
        ChallengeNotificationBuilder.buildFinishChallengeNotification(
          challenge,
        ),
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

  /**
   * Handles the rejoining of a challenge by a client.
   * This method checks if the client is currently associated with a room
   * and, if so, makes the client rejoin that room.
   *
   * @param client - The socket client attempting to rejoin a challenge.
   * @returns A promise that resolves when the operation is complete.
   *          If the client is not associated with any room, the method returns early.
   */
  private async handleRejoinChallenge(client: AuthenticatedSocket) {
    const room = await this.queryBus.execute(
      new GetPlayerChallengeQuery(client.auth.userId),
    );

    if (!room) {
      return;
    }

    client.join(room);

    this.logger.log(
      'Client rejoined to challenge room',
      'ChallengeGateway::handleRejoinChallenge',
      {
        codename: room,
      },
    );
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
  private async handleGeneralConnection() {
    const onlineTotal = this.getConnectedSockets();

    this.logger.log(
      'Client connected 🦊🚬',
      'ChallengeGateway::handleSocketConnection',
      {
        onlineTotal,
      },
    );

    await this.commandBus.execute(new UpdateOnlineCountCommand(onlineTotal));

    this.server.emit(
      NotificationsChannels.LOBBY_NOTIFICATIONS,
      ChallengeNotificationBuilder.buildPlayersNotification(onlineTotal),
    );
  }
}
