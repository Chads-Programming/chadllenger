import { Gamepad2, Plus, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CreateChallengeForm } from './components/create-challenge-form'
import { useSocket } from 'socket/use-socket'
import {
  ChallengeEvents,
  type ChallengeNotificationType,
  type PlayerJoinedGamePayload,
} from '@repo/schemas'
import { useModalTrigger } from 'components/modal/modal-trigger'
import { LobbyCard } from './components/lobby-card'
import { LobbyStrings } from './strings/lobby'

export function meta() {
  return [
    { title: 'Lobby game' },
    { name: 'description', content: 'Select a mode' },
  ]
}

export default function GameSelection() {
  const socket = useSocket()
  const [onlinePlayers, setOnlinePlayers] = useState(0)
  const { openModal } = useModalTrigger()

  useEffect(() => {
    socket.listenEvent(
      ChallengeEvents.PLAYERS,
      (data: ChallengeNotificationType<PlayerJoinedGamePayload>) => {
        setOnlinePlayers(data.data.totalOnline)
      },
    )
  }, [socket])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-4xl mx-auto relative">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Gamepad2 className="w-10 h-10 text-indigo-500" />
          <h1 className="text-5xl font-bold text-center text-white neon-text">
            {LobbyStrings.title}
          </h1>
        </div>
        <p className="text-gray-500 mb-4">Online players: {onlinePlayers}</p>
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

      <CreateChallengeForm onCreateChallenge={console.log} />
    </div>
  )
}
