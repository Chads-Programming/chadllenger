import { Difficult } from '@/models/code-challenge.model'
import * as z from 'zod'

export const challengeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficult: z.enum([Difficult.Easy, Difficult.Medium, Difficult.Hard]),
})

export type CreateChallenge = z.infer<typeof challengeSchema>
