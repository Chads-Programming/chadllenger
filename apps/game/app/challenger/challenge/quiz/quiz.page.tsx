import CurrentQuestion from './components/current-question'
import ChallengeParticipants from '../../common/components/challenge-participants'
import QuestCountdown from './components/quest-countdown'
import ChallengeWelcome from './components/challenge-welcome'
import { Status } from '@repo/schemas'
import { useQuiz } from './quiz-provider'

export default function QuizChallenge() {
  const { challengeState } = useQuiz()

  return (
    <div className="relative min-w-full">
      <div className="max-w-6xl mx-auto relative">
        <QuestCountdown />
        {challengeState.status === Status.PENDING && (
          <ChallengeParticipants participants={challengeState.participants} />
        )}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 mt-5">
            {challengeState.status === Status.PENDING ? (
              <ChallengeWelcome />
            ) : (
              <CurrentQuestion />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
