import { useMemo, useReducer, useState } from 'react'
import { INITIAL_STATE, reducer } from '../quiz-reducer'
import QuizOption from './quiz-option'

export const CurrentQuestion = () => {
  const [challengeState] = useReducer(reducer, INITIAL_STATE)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const sendAnswer = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const currentChallenge = useMemo(() => {
    return challengeState.challenges.find(
      (challenge) => challenge.id === challengeState.currentQuestion.question,
    )
  }, [challengeState])

  if (!currentChallenge) return <div>No challenge found</div>

  return (
    <div className="flex flex-col gap-6">
      <h2>{currentChallenge.question.question}</h2>
      {currentChallenge.question.options.map((option) => (
        <QuizOption
          key={currentChallenge.id}
          option={option}
          onClick={sendAnswer}
          isSelected={selectedOption === option.id}
        />
      ))}
    </div>
  )
}
