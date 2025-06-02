import { useState } from 'react'
import { useQuizQuest } from '../use-quiz-quest'
import QuizOption from './quiz-option'

const CurrentQuestion = () => {
  const { currentChallenge, sendAnswer, selectedOption } = useQuizQuest()
  const [isAnswered, setIsAnswered] = useState(false)

  const handleAnswer = (optionId: string) => {
    sendAnswer(optionId)
    setIsAnswered(true)
  }

  if (!currentChallenge) return <div>No challenge found</div>

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-pretty">
        {currentChallenge.question.question}
      </h2>
      {currentChallenge.question.options.map((option, index) => (
        <QuizOption
          key={currentChallenge.id}
          identifier={index + 1}
          option={option}
          onClick={handleAnswer}
          disabled={isAnswered}
          isSelected={selectedOption === option.id}
        />
      ))}
    </div>
  )
}

export default CurrentQuestion
