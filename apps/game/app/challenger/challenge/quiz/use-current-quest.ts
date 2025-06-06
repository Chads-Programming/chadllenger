import { useMemo } from 'react'
import { useQuiz } from './quiz-provider'

export const useCurrentQuest = () => {
  const { challengeState } = useQuiz()

  const currentQuest = useMemo(() => {
    return challengeState.challenges.find(
      (challenge) => challenge.id === challengeState.currentChallenge,
    )
  }, [challengeState])

  return currentQuest
}
