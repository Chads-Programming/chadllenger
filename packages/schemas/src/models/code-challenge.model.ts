import type { IQuestChallenge } from "./quest-challenge.model"

export interface IQuestCodeChallenge extends IQuestChallenge {
    code: string
    testCases: ITestCase[]
}

export interface ITestCase {
    id: string
    args: string
    expectedOutput: string
    codeChallengeId: string
}