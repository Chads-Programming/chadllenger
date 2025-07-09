export const Difficult = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
  Chad: 'Chad',
} as const

export const ChallengeType = {
  Clash: 'Clash',
  Quiz: 'Quiz',
} as const

export type Difficult = (typeof Difficult)[keyof typeof Difficult]
export type ChallengeType = (typeof ChallengeType)[keyof typeof ChallengeType]

export interface IQuestChallenge {
  id: string
  createdAt: Date
}

export interface IQuestChallengeState {
  questionId: string
  startedAt?: Date
  finishedAt?: Date
  winner?: string
}
