import * as z from 'zod'

import { Difficult } from '@/models/code-challenge.model'

export const challengeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulties: z.array(
    z.enum([Difficult.Easy, Difficult.Medium, Difficult.Hard]),
  ),
  creatorName: z.string().min(2),
})

export type CreateChallenge = z.infer<typeof challengeSchema>
