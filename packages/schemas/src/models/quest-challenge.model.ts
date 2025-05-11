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
  title: string
  description: string
  difficult: Difficult
  createdAt: Date
  updatedAt: Date
}

export interface IQuestChallengeState {
  id: string
  startedAt?: Date
  winner?: string
}
