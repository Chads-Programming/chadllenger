import { Outlet } from 'react-router'
import type { Route } from '../+types/not-found.page'
import { QuizProvider } from './quiz-provider'

const QuizLayout = ({ params }: Route.ComponentProps) => {
  return (
    <QuizProvider codename={params.codename as string}>
      <Outlet />
    </QuizProvider>
  )
}

export default QuizLayout
