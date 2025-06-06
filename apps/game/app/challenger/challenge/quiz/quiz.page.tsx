import { match, P } from 'ts-pattern'
import { Status } from '@repo/schemas'

import CurrentQuestion from './components/current-question'
import QuestCountdown from './components/quest-countdown'
import ChallengeWelcome from './components/challenge-welcome'
import ChallengeBanner from '~/challenger/common/components/challenge-banner'
import ChallengeParticipants from '~/challenger/common/components/challenge-participants'
import QuizQuestResults from './components/quiz-quest-results'
import { useQuiz } from './quiz-provider'
import { useCurrentQuest } from './use-current-quest'
import { useCurrentQuestAnswer } from './use-current-answer'

export default function QuizChallenge() {
  const { challengeState, sendAnswer } = useQuiz()
  const currentQuest = useCurrentQuest()
  const currentQuestAnswer = useCurrentQuestAnswer()

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
        <div className="flex flex-col gap-8">
          {match({ status: challengeState.status, quest: currentQuest })
            .with({ status: Status.PENDING }, () => (
              <>
                <ChallengeWelcome />
                <ChallengeParticipants
                  participants={challengeState.participants}
                />
              </>
            ))
            .with(
              { status: Status.IN_PROGRESS, quest: P.not(P.nullish) },
              ({ quest }) => (
                <CurrentQuestion
                  quest={quest}
                  onAnswer={sendAnswer}
                  selectedAnswer={currentQuestAnswer?.participantAnswer ?? null}
                />
              ),
            )
            .with(
              { status: Status.AWAITING_NEXT_QUEST, quest: P.not(P.nullish) },
              ({ quest }) => (
                <QuizQuestResults
                  results={
                    challengeState.participantsQuestHistory[
                      challengeState.currentChallenge
                    ]
                  }
                  options={quest.question.options}
                />
              ),
            )
            .otherwise(() => (
              <div>No status</div>
            ))}
        </div>
      </div>
    </div>
  )
}
