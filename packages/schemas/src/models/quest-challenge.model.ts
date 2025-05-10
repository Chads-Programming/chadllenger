import type { ITestCase } from './test-case.model'

export const Difficult = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
  Chad: 'Chad',
} as const

export const ChallengeType = {
  Clash: 'Clash',
  Quiz: 'Clash',
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

export interface IQuestionOption {
  id: string
  text: string
  isAnswer: boolean
}
export interface IQuestion {
  id: string
  isMultiple: boolean
  options: IQuestionOption[]
}

export interface IQuestQuizChallenge extends IQuestChallenge {
  questions: IQuestion
}

export interface IQuestCodeChallenge extends IQuestChallenge {
  code: string
  testCases: ITestCase[]
}

export interface IQuestChallengeState {
  id: string
  startedAt?: Date
  winner?: string
}
