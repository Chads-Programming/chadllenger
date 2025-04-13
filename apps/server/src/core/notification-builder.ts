import {
  ChallengeNotificationType,
  PlayerJoinedGamePayload,
  NotificationsType,
  CreatedRoomPayload,
} from '@repo/schemas';

export const ChallengeNotificationBuilder = {
  buildPlayersNotification(
    totalOnline: number,
  ): ChallengeNotificationType<PlayerJoinedGamePayload> {
    return {
      type: NotificationsType.PLAYER_JOINED_GAME,
      messageType: 'user',
      data: {
        totalOnline,
      },
    };
  },

  buildCreatedRoomNotification(
    codename: string,
  ): ChallengeNotificationType<CreatedRoomPayload> {
    return {
      type: NotificationsType.CREATED_ROOM,
      messageType: 'system',
      data: {
        codename,
      },
    };
  },
};
