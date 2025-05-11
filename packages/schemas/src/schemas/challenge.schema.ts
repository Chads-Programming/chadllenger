import * as z from 'zod'
import { ChallengeType, Difficult } from '..'

export const challengeSchema = z.object({
  title: z.string().min(1),
  type: z.enum([ChallengeType.Clash, ChallengeType.Quiz]),
  difficulties: z.array(
    z.enum([Difficult.Easy, Difficult.Medium, Difficult.Hard, Difficult.Chad]),
  ),
  creatorName: z.string().min(2),
})

export const joinChallengeRoomSchema = z.object({
  type: z.enum([ChallengeType.Clash, ChallengeType.Quiz]),
  codename: z.string().min(1),
  username: z.string().min(2),
})

export const answerQuestSchema = z.object({
  codename: z.string().min(1),
  answer: z.string().min(1),
  questionId: z.string().min(1),
})

export type CreateChallenge = z.infer<typeof challengeSchema>
export type JoinChallengeRoom = z.infer<typeof joinChallengeRoomSchema>
export type AnswerQuest = z.infer<typeof answerQuestSchema>
