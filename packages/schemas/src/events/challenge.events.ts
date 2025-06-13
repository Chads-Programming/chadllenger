import type { ChallengeType, IChallengeState } from '@/models'

export const NotificationsChannels = {
  CHALLENGE_NOTIFICATIONS: 'CHALLENGE_NOTIFICATIONS',
  LOBBY_NOTIFICATIONS: 'LOBBY_NOTIFICATIONS',
} as const

export const NotificationsType = {
  CREATED_ROOM: 'CREATED_ROOM',
  STARTING_CHALLENGE: 'STARTING_CHALLENGE',
  PLAYER_JOINED_GAME: 'PLAYER_JOINED_GAME',
  PLAYER_LEFT_GAME: 'PLAYER_LEFT_GAME',
  STARTED_ROUND: 'STARTED_ROUND',
  FINISH_QUEST: 'FINISH_QUEST',
  FINISH_CHALLENGE: 'FINISH_CHALLENGE',
  TOTAL_ONLINE_PLAYERS: 'TOTAL_ONLINE_PLAYERS',
  CONNECTED_PLAYERS: 'CONNECTED_PLAYERS',
} as const

export const MessageTypes = {
  CREATE_ROOM: 'CREATE_CHALLENGE_ROOM',
  JOIN_CHALLENGE_ROOM: 'JOIN_CHALLENGE_ROOM',
  START_CHALLENGE: 'START_CHALLENGE',
  QUIZ_SEND_ANSWER: 'QUIZ_SEND_ANSWER',
} as const

export type CreatedRoomPayload = {
  codename: string
  type: ChallengeType
}

export type PlayerConnectedPayload = {
  totalOnline: number
}

export type PlayerJoinedGame = {
  id: string
  name: string
}

export type QuestResponse = {
  isAnwserCorrect: boolean
  questionId: string
  yourAnswer: string
  correctAwnswer: string
}

export type PlayerLeftGame = {
  id: string
  username: string
}

export type ChallengeLeaderboard = {
  id: string
  name: string
  score: number
}

export type ChallengeSummary = {
  id: string
  codename: string
  leaderboard: ChallengeLeaderboard[]
  type: ChallengeType
}

export type SummaryWithState = {
  summary: ChallengeSummary
  challengeState: IChallengeState
}

export type NotificationsChannelsType =
  (typeof NotificationsChannels)[keyof typeof NotificationsChannels]

export type NotificationKeyType =
  (typeof NotificationsType)[keyof typeof NotificationsType]

export interface ChallengeNotificationType<TData = unknown> {
  id: string
  type: (typeof NotificationsType)[keyof typeof NotificationsType]
  messageType: 'user' | 'system'
  data: TData
  createdAt: Date
}
