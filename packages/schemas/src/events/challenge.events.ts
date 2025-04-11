export const ChallengeEvents = {
  NOTIFICATIONS: 'CHALLENGE_NOTIFICATIONS',
  PLAYERS: 'PLAYERS',
}

export const NotificationsType = {
  CREATED_ROOM: 'CREATED_ROOM',
  PLAYER_JOINED_GAME: 'PLAYER_JOINED_GAME',
  PLAYER_LEFT_GAME: 'PLAYER_LEFT_GAME',
  STARTED_ROUND: 'STARTED_ROUND',
  END_ROUND: 'END_ROUND',
  END_GAME: 'END_GAME',
  TOTAL_ONLINE_PLAYERS: 'TOTAL_ONLINE_PLAYERS',
} as const

export const MessageTypes = {
  CREATE_ROOM: 'CREATE_ROOM',
} as const

export interface ChallengeNotificationType {
  type: (typeof NotificationsType)[keyof typeof NotificationsType]
  messageType: 'user' | 'system'
  data: unknown
}

export class ChallengeNotification implements ChallengeNotificationType {
  constructor(
    readonly type: (typeof NotificationsType)[keyof typeof NotificationsType],
    readonly messageType: 'user' | 'system',
    readonly data: unknown,
  ) {}

  static buildPlayersNotification(totalOnline: number): ChallengeNotification {
    return new ChallengeNotification(
      NotificationsType.TOTAL_ONLINE_PLAYERS,
      'system',
      {
        totalOnline,
      },
    )
  }

  static buildCreatedRoomNotification(codename: string): ChallengeNotification {
    return new ChallengeNotification(NotificationsType.CREATED_ROOM, 'system', {
      codename,
    })
  }
}
