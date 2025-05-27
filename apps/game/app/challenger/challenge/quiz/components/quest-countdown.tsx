import { Status } from '@repo/schemas'
import { useQuiz } from '../quiz-provider'
import { useEffect, useMemo, useRef } from 'react'
import { Timer, type TimerRef } from 'components/ui/timer'

const MILISECONDS_TO_SECONDS = 1000
const SECONDS_TO_SHOW = 30

const QuestCountdown = () => {
  const { challengeState } = useQuiz()
  const timerRef = useRef<TimerRef | null>(null)

  const startTime = useMemo(() => {
    const currentQuest = challengeState.playedChallenges.find(
      (challenge) => challenge.questionId === challengeState.currentChallenge,
    )

    if (!currentQuest?.startedAt) {
      return 0
    }

    const startedAt = new Date(currentQuest.startedAt)

    const diffTime =
      new Date().getTime() / MILISECONDS_TO_SECONDS -
      startedAt.getTime() / MILISECONDS_TO_SECONDS

    const time = SECONDS_TO_SHOW - diffTime

    if (time >= 0) {
      return Math.ceil(time)
    }

    return 0
  }, [challengeState])

  useEffect(() => {
    if (challengeState.status === Status.IN_PROGRESS) {
      timerRef.current?.start(startTime)
    }
  }, [challengeState, startTime])

  if (challengeState.status !== Status.IN_PROGRESS) {
    return null
  }

  return <Timer ref={timerRef} />
}

export default QuestCountdown
