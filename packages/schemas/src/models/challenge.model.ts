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

export type IChallengeStateWithCurrentQuest<
  TChallenge extends IChallengeState = IChallengeState,
> = Omit<TChallenge, 'challenges'> & {
  currentQuest: IQuestChallenge
}

export interface IQuizChallengeState extends IChallengeState {
  challenges: IQuestQuizChallenge[]
}

export const Status = {
  PENDING: 'PENDING',
  QUEST_IN_PROGRESS: 'QUEST_IN_PROGRESS',
  FINISHED: 'FINISHED',
  STARTING: 'STARTING',
  AWAITING_NEXT_QUEST: 'AWAITING_NEXT_QUEST',
} as const

export interface IQuestHistory {
  questionId: string
  participantId: string
  participantAnswer: string
  score: number
  createdAt: Date
}

export type ChallengeStatusType = (typeof Status)[keyof typeof Status]
