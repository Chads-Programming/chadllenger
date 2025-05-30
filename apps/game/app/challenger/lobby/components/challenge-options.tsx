import { useModalTrigger } from 'components/modal/modal-trigger'
import { cn } from 'lib/utils'
import { ArrowLeft, Plus, Users } from 'lucide-react'
import { CREATE_CHALLENGE_REF_ID } from '../hooks/use-create-challenge'
import { useLobby } from '../providers/lobby.provider'
import { JOIN_REF_MODAL_ID } from './join-challenge'
import { ChallengeType } from '@repo/schemas'
import { LobbyStrings } from '~/challenger/common/strings/lobby'
import { LobbyCard } from './lobby-card'

export const ChallengeTypeOptions = () => {
  const { openModal } = useModalTrigger()
  const { challengeType, lobbyTexts, saveLastChallengeType } = useLobby()

  const title =
    challengeType === ChallengeType.Clash ? 'Clash of Code' : 'Chad Quest'

  const bgImage =
    LobbyStrings.challengeType[challengeType ?? ChallengeType.Clash].banner

  const bgColor = 'from-gray-950/90 to-secondary/20'

  const onBack = () => {
    saveLastChallengeType(null)
  }

  return (
    <section className="flex flex-col items-center gap-4">
      <div
        className={cn(
          'p-8 pt-16 rounded-xl bg-gradient-to-br shadow-lg mb-8 relative overflow-hidden w-full border border-base-300 dark:border-base-700',
        )}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 left-4 btn btn-ghost self-start text-white z-10"
        >
          <ArrowLeft size={20} className="mr-2" />
          {LobbyStrings.backToMainMenu}
        </button>
        <div className={`absolute inset-0 bg-gradient-to-br ${bgColor}`} />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-purple-200">{LobbyStrings.chooseOption}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly w-full">
        <LobbyCard
          title={lobbyTexts.createChallenge.title}
          description={lobbyTexts.createChallenge.description}
          banner={lobbyTexts.createChallenge.banner}
        >
          <button
            type="button"
            onClick={() => openModal(CREATE_CHALLENGE_REF_ID)}
            className="btn btn-primary mb-4 gap-2 w-full font-semibold transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]"
          >
            <Plus
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span className="text-lg">{lobbyTexts.createChallenge.button}</span>
          </button>
        </LobbyCard>

        <LobbyCard
          title={lobbyTexts.joinChallenge.title}
          description={lobbyTexts.joinChallenge.description}
          banner={lobbyTexts.joinChallenge.banner}
        >
          <button
            type="button"
            onClick={() => openModal(JOIN_REF_MODAL_ID)}
            className="btn btn-primary font-semibold mb-4 gap-2 w-full transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]"
          >
            <Users
              size={24}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg">{lobbyTexts.joinChallenge.button}</span>
          </button>
        </LobbyCard>
      </div>
    </section>
  )
}
