import { Status } from '@repo/schemas'
import { useQuiz } from '../quiz-provider'
import { useEffect, useRef } from 'react'
import { Timer, type TimerRef } from 'components/ui/timer'
import { match } from 'ts-pattern'
import * as challegenTimeHelpers from '../../helpers/challenge-time'

const QuestCountdown = () => {
  const { challengeState } = useQuiz()
  const timerRef = useRef<TimerRef | null>(null)

  useEffect(() => {
    match(challengeState.status)
      .with(Status.IN_PROGRESS, () => {
        timerRef.current?.start(
          challegenTimeHelpers.getRemainingTime(challengeState, 'quest'),
        )
      })
      .with(Status.AWAITING_NEXT_QUEST, () => {
        timerRef.current?.start(
          challegenTimeHelpers.getRemainingTime(challengeState, 'nextQuest'),
        )
      })
  }, [challengeState])

  return <Timer ref={timerRef} />
}

export default QuestCountdown
