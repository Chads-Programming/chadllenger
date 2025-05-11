import { useState } from 'react'
import ChallengeParticipants from '../clash/challenge-participants'
import type { Route } from './+types/quiz.page'
import QuizOption from './components/quiz-option'
import { useQuiz } from './use-quiz'

export default function QuizChallenge({ params }: Route.ComponentProps) {
  const { challengeState } = useQuiz(params.codename)
  const challenge = challengeState.challenges[0]
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const sendAnswer = (optionId: string) => {
    setSelectedOption(optionId)
  }

  if (!challenge) return <div>No challenge found</div>

  return (
    <div className="relative min-w-full">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid place-items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <h2>{challenge.question.question}</h2>
              {challenge.question.options.map((option) => (
                <QuizOption
                  key={challenge.id}
                  option={option}
                  onClick={sendAnswer}
                  isSelected={selectedOption === option.id}
                />
              ))}
            </div>
            <div className="space-y-6 lg:absolute top-0 right-0 lg:w-[250px]">
              <ChallengeParticipants participants={challengeState.participants} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}