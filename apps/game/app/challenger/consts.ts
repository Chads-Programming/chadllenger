import { Difficult } from '@repo/schemas'
import ChallengeStrings from './strings/challenge'

export const DIFFICULTIES = [
  { value: Difficult.Easy, label: ChallengeStrings.create.difficulty.easy },
  { value: Difficult.Medium, label: ChallengeStrings.create.difficulty.medium },
  { value: Difficult.Hard, label: ChallengeStrings.create.difficulty.hard },
  { value: Difficult.Chad, label: ChallengeStrings.create.difficulty.chad },
]
