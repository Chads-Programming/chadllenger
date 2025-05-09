export const Difficult = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
  Chad: 'Chad',
} as const

export type Difficult = (typeof Difficult)[keyof typeof Difficult]

export interface ICodeChallenge {
  id: string
  title: string
  description: string
  codename: string
  difficult: Difficult
  createdAt: Date
  updatedAt: Date
}

export interface ICodeChallengeState {
  id: string
  startedAt?: Date
  winner?: string
}
