import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { generateUniqueId } from '@/utils/unique-id';
import {
  ChallengeNotificationType,
  PlayerConnectedPayload,
  NotificationsType,
  CreatedRoomPayload,
  ChallengeSummary,
  PlayerJoinedGame,
} from '@repo/schemas';

export const ChallengeNotificationBuilder = {
  buildPlayersNotification(
    totalOnline: number,
  ): ChallengeNotificationType<PlayerConnectedPayload> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.CONNECTED_PLAYERS,
      messageType: 'system',
      data: {
        totalOnline,
      },
      createdAt: new Date(),
    };
  },

  buildCreatedRoomNotification(
    codename: string,
  ): ChallengeNotificationType<CreatedRoomPayload> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.CREATED_ROOM,
      messageType: 'system',
      data: {
        codename,
      },
      createdAt: new Date(),
    };
  },

  joinedChallengeNotification(
    participantId: string,
    participantName: string,
  ): ChallengeNotificationType<PlayerJoinedGame> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.PLAYER_JOINED_GAME,
      messageType: 'system',
      data: {
        id: participantId,
        name: participantName,
      },
      createdAt: new Date(),
    };
  },

  buildFinishChallengeNotification(
    challengeState: ChallengeStateBuilder,
  ): ChallengeNotificationType<ChallengeSummary> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.FINISH_CHALLENGE,
      messageType: 'system',
      data: challengeState.toSummary(),
      createdAt: new Date(),
    };
  },
};
