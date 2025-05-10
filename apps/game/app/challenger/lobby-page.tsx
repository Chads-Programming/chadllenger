import { Code2 } from 'lucide-react'
import { SetupChallenge } from './setup-challenge'
import { LobbyStrings } from './common/strings/lobby'
import { AuroraText } from 'components/ui/aurora-text'
import { JoinChallenge } from './join-challenge'
import { SelectorChallenge } from './selector-challenge'
import { LobbyProvider } from './lobby/providers/lobby.provider'
import { OnlinePlayers } from './lobby/components/online-players'

export function meta() {
  return [{ title: 'Lobby' }, { name: 'description', content: 'Select a mode' }]
}

export default function GameSelection() {
  return (
    <LobbyProvider>
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
        <SelectorChallenge />
        <SetupChallenge />
        <JoinChallenge />
      </div>
    </LobbyProvider>
  )
}
