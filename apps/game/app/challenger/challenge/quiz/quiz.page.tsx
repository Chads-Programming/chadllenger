import CurrentQuestion from './components/current-question'
import QuestCountdown from './components/quest-countdown'
import ChallengeWelcome from './components/challenge-welcome'
import ChallengeBanner from '~/challenger/common/components/challenge-banner'
import ChallengeParticipants from '~/challenger/common/components/challenge-participants'
import QuizQuestResults from './components/quiz-quest-results'
import { useQuiz } from './quiz-provider'
import { Status, type IQuestQuizChallenge } from '@repo/schemas'
import { useQuizQuest } from './use-quiz-quest'

export default function QuizChallenge() {
  const { challengeState } = useQuiz()
  const { currentChallenge } = useQuizQuest()

  return (
    <div className="relative min-w-full">
      <div className="max-w-6xl mx-auto relative flex flex-col gap-8">
        <ChallengeBanner
          title={challengeState.title}
          codename={challengeState.codename}
          type={challengeState.type}
          status={challengeState.status}
          renderOnStart={<QuestCountdown />}
        />
        {challengeState.status === Status.PENDING && (
          <section className="flex flex-col gap-8">
            <ChallengeWelcome />
            <ChallengeParticipants participants={challengeState.participants} />
          </section>
        )}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 mt-5">
            {challengeState.status === Status.IN_PROGRESS && (
              <CurrentQuestion />
            )}
            {challengeState.status === Status.AWAITING_NEXT_QUEST && (
              <QuizQuestResults
                results={
                  challengeState.participantsQuestHistory[
                    challengeState.currentChallenge
                  ]
                }
                options={
                  (currentChallenge as IQuestQuizChallenge).question.options
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
