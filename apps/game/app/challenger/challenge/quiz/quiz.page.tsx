import { match, P } from 'ts-pattern'
import { Status } from '@repo/schemas'

import CurrentQuestion from './components/current-question'
import ChallengeWelcome from './components/challenge-welcome'
import ChallengeBanner from '~/challenger/common/components/challenge-banner'
import ChallengeParticipants from '~/challenger/common/components/challenge-participants'
import QuizQuestResults from './components/quiz-quest-results'
import { useQuiz } from './quiz-provider'
import { useCurrentQuest } from './use-current-quest'
import { useCurrentQuestAnswer } from './use-current-answer'
import { Starting } from '~/challenger/common/components/starting'

export default function QuizChallenge() {
  const { challengeState, sendAnswer } = useQuiz()
  const currentQuest = useCurrentQuest()
  const currentQuestAnswer = useCurrentQuestAnswer()

  return (
    <main className="relative min-w-full lg:px-16">
      <div className="flex flex-col w-full gap-8">
        <ChallengeBanner
          title={challengeState.title}
          codename={challengeState.codename}
          type={challengeState.type}
          status={challengeState.status}
        />
        <div className="flex flex-col gap-8 mt-9">
          {match({ status: challengeState.status, quest: currentQuest })
            .with({ status: Status.PENDING }, () => (
              <div className="flex flex-col items-center gap-24 w-full">
                <ChallengeWelcome />
                <ChallengeParticipants
                  challengeHost={challengeState.creator}
                  participants={challengeState.participants}
                />
              </div>
            ))
            .with({ status: Status.STARTING }, () => <Starting />)
            .with(
              { status: Status.QUEST_IN_PROGRESS, quest: P.not(P.nullish) },
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
            .with({ status: Status.FINISHED }, () => (
              <div>Challenge Finished</div>
            ))
            .otherwise(() => (
              <div>Unknown State</div>
            ))}
        </div>
      </div>
    </main>
  )
}
