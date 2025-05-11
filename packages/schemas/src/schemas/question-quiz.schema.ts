import * as z from 'zod'

export const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrectAnswer: z.boolean(),
})

export const questionQuizSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(questionOptionSchema),
})

export type IQuestionOption = z.infer<typeof questionOptionSchema>

export type IQuestionQuiz = z.infer<typeof questionQuizSchema>
