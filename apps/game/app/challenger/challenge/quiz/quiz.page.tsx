import ChallengeParticipants from '../clash/challenge-participants'
import type { Route } from './+types/quiz.page'
import QuizOption from './components/quiz-option'
import { useQuiz } from './use-quiz'

export default function QuizChallenge({ params }: Route.ComponentProps) {
  const { challengeState } = useQuiz(params.codename)
  const challenge = challengeState.challenges[0]

  const sendAnswer = (optionId: string) => {
    console.log({ optionId })
  }

  if (!challenge) return <div>No challenge found</div>

  return (
    <div>
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 
<div className="grid grid-cols-3 gap-6">
            <div className="space-y-6">
              <ChallengeParticipants participants={challengeState.participants} />
            </div>
          </div>
*/
