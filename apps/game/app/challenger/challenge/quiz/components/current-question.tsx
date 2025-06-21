import { useState } from 'react'
import type { IQuestQuizChallenge } from '@repo/schemas'
import { getEmojiById } from 'utils/emoji'
import { cn } from 'lib/utils'

interface Props {
  quest: IQuestQuizChallenge
  onAnswer: (optionId: string) => void
  selectedAnswer: string | null
}

const CurrentQuestion = ({ quest, selectedAnswer, onAnswer }: Props) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedAnswer,
  )

  const handleAnswer = (optionId: string) => {
    onAnswer(optionId)
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
          <button
            key={option.id}
            type="button"
            disabled={isAnswered}
            onClick={() => handleAnswer(option.id)}
            className={cn(
              'inline-flex justify-start gap-4 btn btn-active bg-gray-700 hover:bg-secondary cursor-pointer text-white px-4 py-2 rounded-md',
              selectedOption === option.id && 'bg-secondary',
            )}
          >
            <span className="text-sm">{getEmojiById(index)}</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CurrentQuestion
