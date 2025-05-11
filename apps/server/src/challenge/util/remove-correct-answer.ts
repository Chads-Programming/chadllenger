import { QuizChallengeStateBuilder } from "../models/challenge-state.model";

export function removeCorrectAnswer(challenge: QuizChallengeStateBuilder) {
    const quizWithoutAnswers = challenge.challenges.map((challenge) => {
        return {
            ...challenge,
            question: {
                ...challenge.question,
                options: challenge.question.options.map((option) => {
                    const { isCorrectAnswer, ...rest } = option;
                    return rest;
                }),
            }
        };
    });

    const challengeWithoutAnswers = {
        ...challenge,
        challenges: quizWithoutAnswers,
    }
    return challengeWithoutAnswers;
}
