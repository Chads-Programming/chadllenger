import * as z from 'zod'
import { Difficult } from '..'

export const challengeSchema = z.object({
  title: z.string().min(1),
  difficulties: z.array(
    z.enum([Difficult.Easy, Difficult.Medium, Difficult.Hard, Difficult.Chad]),
  ),
  creatorName: z.string().min(2),
})

export const joinChallengeRoomSchema = z.object({
  codename: z.string().min(1),
  username: z.string().min(2),
})

export type CreateChallenge = z.infer<typeof challengeSchema>
export type JoinChallengeRoom = z.infer<typeof joinChallengeRoomSchema>
