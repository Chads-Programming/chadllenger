import { Code2, Plus, Users } from 'lucide-react'
import { SetupChallenge } from './setup-challenge'
import { useModalTrigger } from 'components/modal/modal-trigger'
import { LobbyCard } from './components/lobby-card'
import { LobbyStrings } from './strings/lobby'
import { AuroraText } from 'components/aurora-text'
import { OnlinePlayers } from './components/online-players'

export function meta() {
  return [
    { title: 'Lobby game' },
    { name: 'description', content: 'Select a mode' },
  ]
}

export default function GameSelection() {
  const { openModal } = useModalTrigger()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-4xl mx-auto relative flex flex-col items-center justify-start gap-4 mb-12">
        <div className="flex items-center justify-center gap-3">
          <Code2 className="w-10 h-10 text-indigo-500" />
          <AuroraText className="text-4xl font-bold">
            {LobbyStrings.title}
          </AuroraText>
        </div>
        <OnlinePlayers />
      </div>
      <section className="flex flex-wrap justify-center gap-8 mb-6">
        <LobbyCard
          title={LobbyStrings.createChallenge.title}
          description={LobbyStrings.createChallenge.description}
          banner={LobbyStrings.createChallenge.banner}
        >
          <button
            type="button"
            onClick={() => openModal('create-challenge-modal')}
            className="btn btn-primary mb-4 gap-2 w-full font-semibold transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]"
          >
            <Plus
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span className="text-lg">
              {LobbyStrings.createChallenge.button}
            </span>
          </button>
        </LobbyCard>

        <LobbyCard
          title={LobbyStrings.joinChallenge.title}
          description={LobbyStrings.joinChallenge.description}
          banner={LobbyStrings.joinChallenge.banner}
        >
          <button
            type="button"
            onClick={() => openModal('create-challenge-modal')}
            className="btn btn-primary font-semibold mb-4 gap-2 w-full transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]"
          >
            <Users
              size={24}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-lg">{LobbyStrings.joinChallenge.button}</span>
          </button>
        </LobbyCard>
      </section>

      <SetupChallenge />
    </div>
  )
}
