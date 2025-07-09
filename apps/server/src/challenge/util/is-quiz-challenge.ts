import { QuizChallengeStateBuilder } from "../models/challenge-state.model";
import { ChallengeType } from "@repo/schemas";
import { ChallengeStateBuilder } from "../models/challenge-state.model";

export function isQuizChallenge(challenge: ChallengeStateBuilder): challenge is QuizChallengeStateBuilder {
    return challenge.type === ChallengeType.Quiz;
}