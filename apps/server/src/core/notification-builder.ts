import { ChallengeStateBuilder } from '@/challenge/models/challenge-state.model';
import { generateUniqueId } from '@/utils/unique-id';
import {
  ChallengeNotificationType,
  PlayerConnectedPayload,
  NotificationsType,
  CreatedRoomPayload,
  PlayerJoinedGame,
  ChallengeType,
  IChallengeStateWithCurrentQuest,
  SummaryWithState,
  IChallengeState,
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
    type: ChallengeType,
  ): ChallengeNotificationType<CreatedRoomPayload> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.CREATED_ROOM,
      messageType: 'system',
      data: {
        codename,
        type,
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

  startedRoundNotification(
    challenge: IChallengeStateWithCurrentQuest,
  ): ChallengeNotificationType<IChallengeStateWithCurrentQuest> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.STARTED_ROUND,
      messageType: 'system',
      data: challenge,
      createdAt: new Date(),
    };
  },

  buildFinishChallengeNotification(
    challengeState: ChallengeStateBuilder,
  ): ChallengeNotificationType<IChallengeState['participantsQuestHistory']> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.FINISH_CHALLENGE,
      messageType: 'system',
      data: challengeState.participantsQuestHistory,
      createdAt: new Date(),
    };
  },

  buildFinishQuestNotification(
    challengeState: ChallengeStateBuilder,
  ): ChallengeNotificationType<SummaryWithState> {
    return {
      id: generateUniqueId(),
      type: NotificationsType.FINISH_QUEST,
      messageType: 'system',
      data: {
        summary: challengeState.toSummary(),
        challengeState: challengeState.getProps(),
      },
      createdAt: new Date(),
    };
  },
};
