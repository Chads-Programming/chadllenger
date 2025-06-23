import { Outlet } from 'react-router'
import { QuizProvider } from './quiz-provider'
import type { Route } from './+types/quiz.layout'

const QuizLayout = ({ params }: Route.ComponentProps) => {
  return (
    <QuizProvider codename={params.codename as string}>
      <Outlet />
    </QuizProvider>
  )
}

export default QuizLayout
