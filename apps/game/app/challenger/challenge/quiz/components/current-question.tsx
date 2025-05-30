import QuizOption from './quiz-option'
import { useQuizQuest } from '../use-quiz-quest'

const CurrentQuestion = () => {
  const { currentChallenge, sendAnswer, selectedOption } = useQuizQuest()

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

export default CurrentQuestion
