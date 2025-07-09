import z from "zod";
import { questionQuizSchema } from "./question-quiz.schema";

export const generatedQuizChallengeSchema = z.object({
    title: z.string(),
    description: z.string(),
    questions: z.array(questionQuizSchema),
});

export type IGeneratedQuizChallenge = z.infer<typeof generatedQuizChallengeSchema>;