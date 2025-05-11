import type { Route } from './+types/quiz.page'
import { useQuiz } from './use-quiz'

export default function QuizChallenge({ params }: Route.ComponentProps) {
  const { challengeState } = useQuiz(params.codename)
  return (
    <div>
      <h1>Quiz Challenge</h1>
    </div>
  )
}
