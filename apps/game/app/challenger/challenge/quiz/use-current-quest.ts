import { useMemo } from 'react'
import { useQuiz } from './quiz-provider'

export const useCurrentQuest = () => {
  const { challengeState } = useQuiz()

  const currentQuest = useMemo(() => {
    if (!challengeState?.currentChallenge) {
      return null
    }

    return challengeState.challenges.find(
      (challenge) => challenge.id === challengeState.currentChallenge,
    )
  }, [challengeState])

  return currentQuest
}
