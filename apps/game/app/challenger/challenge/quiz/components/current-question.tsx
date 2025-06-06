import { useState } from 'react'
import QuizOption from './quiz-option'
import type { IQuestQuizChallenge } from '@repo/schemas'

interface Props {
  quest: IQuestQuizChallenge
  onAnswer: (optionId: string) => void
  selectedAnswer: string | null
}

const CurrentQuestion = ({ quest, selectedAnswer }: Props) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedAnswer,
  )

  const handleAnswer = (optionId: string) => {
    setSelectedOption(optionId)
    setIsAnswered(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-pretty">
        {quest.question.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quest.question.options.map((option, index) => (
          <QuizOption
            key={quest.id}
            identifier={index + 1}
            option={option}
            onClick={handleAnswer}
            disabled={isAnswered}
            isSelected={selectedOption === option.id}
          />
        ))}
      </div>
    </div>
  )
}

export default CurrentQuestion
