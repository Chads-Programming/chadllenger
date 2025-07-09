import type { IParticipant } from '@repo/schemas'
import Avatar from 'components/ui/avatar'
import { memo } from 'react'
import ChallengeStrings from '../strings/challenge'
import { Crown, Users } from 'lucide-react'

interface Props {
  challengeHost: string
  participants: IParticipant[]
}

const ChallengeParticipants = memo(({ participants, challengeHost }: Props) => {
  return (
    <div className="card card-blur rounded-md border border-base-300 w-full">
      <div className="inline-flex items-center m-4 gap-2 text-primary">
        <Users className="w-6 h-6" />
        <h3 className="text-xl">
          <span>{ChallengeStrings.challenge.participants.title}</span>
        </h3>
        <span className="bg-secondary  text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
          {participants.length}
        </span>
      </div>
      <div className="space-y-4 px-4 inline-flex flex-wrap gap-2">
        <ul className="space-y-2 flex gap-2 flex-wrap">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-secondary/50 transition-all duration-200 hover:bg-gray-800/70"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-2xl">
                  <Avatar id={participant.id} name={participant.name} />
                </div>
                {participant.id === challengeHost && (
                  <Crown
                    fill="oklch(85.2% 0.199 91.936)"
                    className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400"
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-white flex items-center space-x-2">
                  <span>{participant.name}</span>
                  {participant.id === challengeHost && (
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
                      HOST
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="place-end m-4 p-4 bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-600">
        <div className="text-center text-gray-400">
          <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <div className="text-sm">Esperando más jugadores...</div>
          <div className="text-xs mt-1">Comparte el código de sala</div>
        </div>
      </div>
    </div>
  )
})

export default ChallengeParticipants
