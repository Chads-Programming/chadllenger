import type {
  IQuestChallenge,
  IQuestChallengeState,
} from './quest-challenge.model'
import type { IParticipant } from './participant.model'

export interface IChallengeState {
  id: string
  title: string
  codename: string
  participants: IParticipant[]
  challenges: IQuestChallenge[]
  currentChallenge: string
  playedChallenges: IQuestChallengeState[]
  createdAt: Date
  updatedAt: Date
  creator: string
  status: ChallengeStatusType
  expiration: number
}

export const Status = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: ' FINISHED',
} as const

export type ChallengeStatusType = (typeof Status)[keyof typeof Status]
