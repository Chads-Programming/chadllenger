import type { IQuestionOptionWithoutAnswer } from '@repo/schemas'
import { Confetti, ConfettiButton } from 'components/ui/confetti-button'
import { cn } from 'lib/utils'

interface QuizOptionProps {
  option: IQuestionOptionWithoutAnswer
  onClick: (id: string) => void
  isSelected: boolean
}

export default function QuizOption({
  option,
  onClick,
  isSelected,
}: QuizOptionProps) {
  return (
    <ConfettiButton
      onClick={() => onClick(option.id)}
      options={{
        get angle() {
          return Math.random() * 360
        },
      }}
      className={cn(
        'bg-gray-700 hover:bg-secondary cursor-pointer text-white px-4 py-2 rounded-md',
        isSelected && 'bg-secondary',
      )}
    >
      {option.text}
    </ConfettiButton>
  )
}
