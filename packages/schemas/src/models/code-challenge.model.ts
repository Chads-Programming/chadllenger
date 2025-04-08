export const Difficult = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
} as const

export type Difficult = (typeof Difficult)[keyof typeof Difficult]

export interface CodeChallengeModel {
  id: string
  title: string
  description: string
  codename: string
  difficult: Difficult
  createdAt: Date
  updatedAt: Date
}
