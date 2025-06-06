import type { IQuestChallengeState, IQuizChallengeState } from '@repo/schemas'
import { match } from 'ts-pattern'

const MILISECONDS_TO_SECONDS = 1000
const SECONDS_TO_SHOW = 30

const calculateTime = (
  dateDiscriminator: 'finishedAt' | 'startedAt',
  questState?: IQuestChallengeState,
) => {
  const rawDate = questState?.[dateDiscriminator]

  if (!rawDate) {
    return 0
  }

  const formatedDate = new Date(rawDate)

  const diffTime =
    new Date().getTime() / MILISECONDS_TO_SECONDS -
    formatedDate.getTime() / MILISECONDS_TO_SECONDS

  const time = SECONDS_TO_SHOW - diffTime

  if (time >= 0) {
    return Math.ceil(time)
  }

  return 0
}

const findQuestState = (challengeState: IQuizChallengeState) => {
  return challengeState.playedChallenges.find(
    (challenge) => challenge.questionId === challengeState.currentChallenge,
  )
}

const calculateQuestTime = (challengeState: IQuizChallengeState) => {
  const currentQuest = findQuestState(challengeState)

  return calculateTime('finishedAt', currentQuest)
}
const calculateNextQuestTime = (challengeState: IQuizChallengeState) => {
  const currentQuest = findQuestState(challengeState)

  return calculateTime('finishedAt', currentQuest)
}

export const getRemainingTime = (
  challengeState: IQuizChallengeState,
  type: 'quest' | 'nextQuest',
) => {
  return match(type)
    .with('quest', () => calculateQuestTime(challengeState))
    .with('nextQuest', () => calculateNextQuestTime(challengeState))
    .exhaustive()
}
