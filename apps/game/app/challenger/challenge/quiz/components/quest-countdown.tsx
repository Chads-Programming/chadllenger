import { useQuiz } from '../quiz-provider'
import { useEffect, useRef } from 'react'
import { Timer, type TimerRef } from 'components/ui/timer'
import * as challegenTimeHelpers from '../../helpers/challenge-time'

const QuestCountdown = () => {
  const { challengeState } = useQuiz()
  const timerRef = useRef<TimerRef | null>(null)

  useEffect(() => {
    timerRef.current?.start(
      challegenTimeHelpers.getRemainingTime(challengeState),
    )
  }, [challengeState])

  return <Timer ref={timerRef} />
}

export default QuestCountdown
