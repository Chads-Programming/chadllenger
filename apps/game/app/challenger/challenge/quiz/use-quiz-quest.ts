import { useMemo, useState } from 'react'
import { useQuiz } from './quiz-provider'

export const useQuizQuest = () => {
  const { challengeState } = useQuiz()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const sendAnswer = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const currentChallenge = useMemo(() => {
    return challengeState.challenges.find(
      (challenge) => challenge.id === challengeState.currentChallenge,
    )
  }, [challengeState])

  return {
    selectedOption,
    currentChallenge,
    sendAnswer,
  }
}
