import { useUser } from 'providers/user-provider'
import ChallengeStrings from '~/challenger/common/strings/challenge'
import { useQuiz } from '../quiz-provider'
import { ArrowRightIcon, Users } from 'lucide-react'

const ChallengeWelcome = () => {
  const { userID } = useUser()
  const { challengeState, startChallenge } = useQuiz()

  const isHost = userID === challengeState.creator

  return (
    <div className="card w-full rounded-lg card-side card-blur overflow-clip shadow-sm  self-center p-0 border border-base-300">
      <figure className="hidden! lg:block! w-[15rem]">
        <img src="/images/awaiting.png" alt="Awaiting for players" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary inline-flex items-center mt-2 text-2xl">
          <Users /> {ChallengeStrings.challenge.welcome.title}
        </h2>
        <p className="mb-2 text-lg">
          {ChallengeStrings.challenge.welcome.description}
        </p>
        <div className="card-actions justify-start">
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
