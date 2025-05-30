import type {
  ChallengeType,
  Difficult,
  IQuestChallenge,
  IQuestChallengeState,
} from './quest-challenge.model'
import type { IParticipant } from './participant.model'
import type { IQuestQuizChallenge } from './quiz-challenge.model'

export interface IChallengeState {
  id: string
  title: string
  codename: string
  participants: IParticipant[]
  difficulties: Difficult[]
  challenges: IQuestChallenge[]
  currentChallenge: string
  playedChallenges: IQuestChallengeState[]
  participantsQuestHistory: Record<string, IQuestHistory[]>
  startedAt?: Date
  createdAt: Date
  updatedAt: Date
  creator: string
  status: ChallengeStatusType
  expiration: number
  type: ChallengeType
}

export type IChallengeStateWithCurrentQuest = Omit<
  IChallengeState,
  'challenges'
> & {
  currentQuest: IQuestChallenge
}

export interface IQuizChallengeState extends IChallengeState {
  challenges: IQuestQuizChallenge[]
}

export const Status = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: ' FINISHED',
  AWAITING_NEXT_QUEST: ' AWAITING_NEXT_QUEST',
} as const

export interface IQuestHistory {
  questionId: string
  participantId: string
  participantAnswer: string
  score: number
  createdAt: Date
}

export type ChallengeStatusType = (typeof Status)[keyof typeof Status]
