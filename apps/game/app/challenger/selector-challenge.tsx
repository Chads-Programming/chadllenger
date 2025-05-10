import { Users } from 'lucide-react'
import { Plus } from 'lucide-react'
import { LobbyCard } from './lobby/components/lobby-card'
import { CREATE_CHALLENGE_REF_ID } from './lobby/hooks/use-create-challenge'
import { JOIN_REF_MODAL_ID } from './join-challenge'
import { useModalTrigger } from 'components/modal/modal-trigger'
import { useLobby } from './lobby/providers/lobby.provider'
import { ChallengeType } from '@repo/schemas'

export const SelectorChallenge = () => {
  const { challengeType } = useLobby()

  if (!challengeType) return <SelectorChallengeType />

  return <ChallengeCreateOrJoin />
}

const SelectorChallengeType = () => {
  const { challengeType, setChallengeType } = useLobby()

  return (
    <section className="flex flex-wrap justify-center gap-8 mb-6">
      <LobbyCard
        title="Quiz Challenge"
        description="Test your knowledge with interactive quizzes"
        banner="/images/example-300x350.png"
      >
        <button
          type="button"
          onClick={() => setChallengeType(ChallengeType.Quiz)}
          className="btn btn-primary mb-4 gap-2 w-full font-semibold transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]"
        >
          <Plus
            size={24}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          <span className="text-lg">Select Quiz Challenge</span>
        </button>
      </LobbyCard>

      <LobbyCard
        title="Clash of Code"
        description="Compete in real-time coding challenges"
        banner="/images/example-300x350.png"
      >
        <button
          type="button"
          onClick={() => setChallengeType(ChallengeType.Clash)}
          className="btn btn-primary mb-4 gap-2 w-full font-semibold transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]"
        >
          <Plus
            size={24}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          <span className="text-lg">Select Code Challenge</span>
        </button>
      </LobbyCard>
    </section>
  )
}

const ChallengeCreateOrJoin = () => {
  const { openModal } = useModalTrigger()
  const { lobbyTexts } = useLobby()

  return (
    <section className="flex flex-wrap justify-center gap-8 mb-6">
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
    </section>
  )
}
