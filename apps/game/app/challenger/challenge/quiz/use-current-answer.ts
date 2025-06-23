import { useUser } from 'providers/user-provider'
import { useQuiz } from './quiz-provider'
import { useMemo } from 'react'

export const useCurrentQuestAnswer = () => {
  const { challengeState } = useQuiz()
  const { userID } = useUser()

  const currentQuest = useMemo(() => {
    return challengeState?.participantsQuestHistory[
      challengeState.currentChallenge
    ]?.find((challenge) => challenge.participantId === userID)
  }, [challengeState, userID])

  return currentQuest
}
