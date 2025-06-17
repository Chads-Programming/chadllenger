import { useUser } from 'providers/user-provider'
import ChallengeStrings from '~/challenger/common/strings/challenge'
import { useQuiz } from '../quiz-provider'
import { ArrowRightIcon, Users } from 'lucide-react'
import { ShineBorder } from 'components/ui/shine-border'
import LetterGlitch from 'components/ui/letter-glitch'

const ChallengeWelcome = () => {
  const { userID } = useUser()
  const { challengeState, startChallenge } = useQuiz()

  const isHost = userID === challengeState.creator

  return (
    <div className="card lg:card-side backdrop-blur-2xl bg-gradient-to-r from-primary/10 to-primary/5 shadow-sm border border-base-300 lg:max-w-4xl self-center">
      <ShineBorder shineColor="oklch(62% 0.194 149.214)" />

      <div className="card-body relative">
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
        <figure className="overflow-hidden absolute w-[19rem] inline-flex justify-center  top-8 left-[30%] right-[30%]">
          <img
            src="/images/chad-horse.png"
            draggable="false"
            alt="welcome challenge"
          />
        </figure>
        <h2 className="card-title text-primary inline-flex items-center mt-2">
          <Users /> {ChallengeStrings.challenge.welcome.title}
        </h2>
        <p className="mb-2">{ChallengeStrings.challenge.welcome.description}</p>
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
