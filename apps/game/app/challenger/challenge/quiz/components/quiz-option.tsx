import type { IQuestionOptionWithoutAnswer } from '@repo/schemas'

interface QuizOptionProps {
  option: IQuestionOptionWithoutAnswer
  onClick: (id: string) => void
}

export default function QuizOption({ option, onClick }: QuizOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(option.id)}
      className="bg-gray-700 hover:bg-secondary cursor-pointer text-white px-4 py-2 rounded-md"
    >
      {option.text}
    </button>
  )
}
