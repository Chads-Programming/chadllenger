import { Status, type IQuizChallengeState } from '@repo/schemas'
import { match, P } from 'ts-pattern'

const MILISECONDS_TO_SECONDS = 1000
const SECONDS_TO_SHOW_QUEST = 30
const SECONDS_TO_SHOW_STARTING_CHALLENGE = 5

type OnlyQuestState = Pick<
  IQuizChallengeState,
  'playedChallenges' | 'currentChallenge' | 'startedAt' | 'status'
>

const calculateTime = (durationTime: number, rawDate?: string | Date) => {
  if (!rawDate) {
    return 0
  }

  const formatedDate = new Date(rawDate)

  const diffTime =
    new Date().getTime() / MILISECONDS_TO_SECONDS -
    formatedDate.getTime() / MILISECONDS_TO_SECONDS

  const time = durationTime - diffTime

  if (time >= 0) {
    return Math.ceil(time)
  }

  return 0
}

const findQuestState = (challengeState: OnlyQuestState) => {
  return challengeState.playedChallenges.find(
    (challenge) => challenge.questionId === challengeState.currentChallenge,
  )
}

const calculateQuestTime = (challengeState: OnlyQuestState) => {
  const currentQuest = findQuestState(challengeState)

  return calculateTime(SECONDS_TO_SHOW_QUEST, currentQuest?.startedAt)
}
const calculateNextQuestTime = (challengeState: OnlyQuestState) => {
  const currentQuest = findQuestState(challengeState)

  return calculateTime(SECONDS_TO_SHOW_QUEST, currentQuest?.finishedAt)
}

const calculateStartingChallengeTime = (challengeState: OnlyQuestState) => {
  return calculateTime(
    SECONDS_TO_SHOW_STARTING_CHALLENGE,
    challengeState.startedAt,
  )
}

export const getRemainingTime = (challengeState: OnlyQuestState) => {
  return match(challengeState.status)
    .with(Status.STARTING, () => calculateStartingChallengeTime(challengeState))
    .with(Status.QUEST_IN_PROGRESS, () => calculateQuestTime(challengeState))
    .with(Status.AWAITING_NEXT_QUEST, () =>
      calculateNextQuestTime(challengeState),
    )
    .with(P.union(Status.PENDING, Status.FINISHED), () => 0)
    .exhaustive()
}
