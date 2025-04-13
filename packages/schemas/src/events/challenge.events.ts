export const ChallengeEvents = {
  NOTIFICATIONS: 'CHALLENGE_NOTIFICATIONS',
  PLAYERS: 'PLAYERS',
} as const

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

export type CreatedRoomPayload = {
  codename: string
}

export type PlayerJoinedGamePayload = {
  totalOnline: number
}

export interface ChallengeNotificationType<TData = unknown> {
  type: (typeof NotificationsType)[keyof typeof NotificationsType]
  messageType: 'user' | 'system'
  data: TData
}
