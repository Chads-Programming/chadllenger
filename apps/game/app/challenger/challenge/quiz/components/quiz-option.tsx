import type { IQuestionOptionWithoutAnswer } from '@repo/schemas'
import { cn } from 'lib/utils'
import { getEmojiById } from 'utils/emoji'

interface QuizOptionProps {
  identifier: number
  option: IQuestionOptionWithoutAnswer
  onClick: (id: string) => void
  isSelected: boolean
  disabled: boolean
}

export default function QuizOption({
  identifier,
  option,
  onClick,
  isSelected,
  disabled = false,
}: QuizOptionProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(option.id)}
      className={cn(
        'inline-flex justify-start gap-4 btn btn-active bg-gray-700 hover:bg-secondary cursor-pointer text-white px-4 py-2 rounded-md',
        isSelected && 'bg-secondary',
      )}
    >
      <span className="text-sm">{getEmojiById(identifier)}</span>
      {option.text}
    </button>
  )
}
