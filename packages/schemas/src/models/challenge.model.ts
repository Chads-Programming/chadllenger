import type {
  ICodeChallenge,
  ICodeChallengeState,
} from './code-challenge.model'
import type { IParticipant } from './participant.model'

export interface IChallengeState {
  id: string
  title: string
  codename: string
  participants: IParticipant[]
  codeChallenges: ICodeChallenge[]
  currentChallenge: string
  playedChallenges: ICodeChallengeState[]
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
