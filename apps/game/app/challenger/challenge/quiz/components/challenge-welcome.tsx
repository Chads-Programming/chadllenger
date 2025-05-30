import { useUser } from 'providers/user-provider'
import ChallengeStrings from '~/challenger/common/strings/challenge'
import { useQuiz } from '../quiz-provider'
import { ArrowRightIcon, Users } from 'lucide-react'
import { ShineBorder } from 'components/ui/shine-border'

const ChallengeWelcome = () => {
  const { userID } = useUser()
  const { challengeState, startChallenge } = useQuiz()

  const isHost = userID === challengeState.creator

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm border border-base-300 lg:max-w-4xl self-center">
      <ShineBorder shineColor="oklch(62% 0.194 149.214)" />
      <figure className="max-w-64 overflow-hidden">
        <img src="/images/awaiting.png" alt="welcome challenge" />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium text-primary">
            {isHost
              ? ChallengeStrings.challenge.welcome.goat
              : ChallengeStrings.challenge.welcome.guest}
          </span>
        </div>
        <h2 className="card-title">
          {ChallengeStrings.challenge.welcome.title}
        </h2>
        <p>{ChallengeStrings.challenge.welcome.description}</p>
        <div className="card-actions justify-end">
          {isHost ? (
            <button
              className="btn btn-primary group"
              type="button"
              onClick={startChallenge}
            >
              {ChallengeStrings.challenge.start}
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            <div role="alert" className="alert alert-info alert-soft w-full">
              <span>{ChallengeStrings.challenge.welcome.alert}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChallengeWelcome
