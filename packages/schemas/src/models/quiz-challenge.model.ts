import type { IQuestionQuiz } from "@/schemas/question-quiz.schema"
import type { IQuestChallenge } from "./quest-challenge.model"

export interface IQuestQuizChallenge extends IQuestChallenge {
    questions: IQuestionQuiz[]
}