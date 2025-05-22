import type { Route } from './+types/quiz.page'
import { useQuiz } from './use-quiz'
import { CurrentQuestion } from './components/current-question'
import ChallengeParticipants from '../clash/challenge-participants'

export default function QuizChallenge({ params }: Route.ComponentProps) {
  const { challengeState } = useQuiz(params.codename)

  return (
    <div className="relative min-w-full">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid place-items-center">
          <div className="flex flex-col gap-6">
            <CurrentQuestion />
            <div className="space-y-6 lg:absolute top-0 right-0 lg:w-[250px]">
              <ChallengeParticipants
                participants={challengeState.participants}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
