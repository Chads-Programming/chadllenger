import { ChallengeStateModel } from '@/challenge/models/challenge-state.model';
import { generateUniqueId } from '@/utils/unique-id';
import {
  ChallengeNotificationType,
  PlayerConnectedPayload,
  NotificationsType,
  CreatedRoomPayload,
  ChallengeSummary,
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

  buildFinishChallengeNotification(
    challengeState: ChallengeStateModel,
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
