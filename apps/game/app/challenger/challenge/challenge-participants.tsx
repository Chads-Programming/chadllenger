import type { IParticipant } from '@repo/schemas'
import Avatar from 'components/ui/avatar'
import { Users } from 'lucide-react'
import { memo } from 'react'
import ChallengeStrings from '../strings/challenge'

interface Props {
  participants: IParticipant[]
}

const ChallengeParticipants = memo(({ participants }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {ChallengeStrings.challenge.participants.title}
          </h3>
          <div className="flex items-center text-gray-500">
            <Users className="h-5 w-5 mr-2" />
            <span>{participants.length}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center space-x-2 text-gray-700 gap-2 justify-between"
            >
              <div className="inline-flex gap-1 items-center">
                <Avatar id={participant.id} name={participant.name} />
                <span className="font-semibold">{participant.name}</span>
              </div>
              <div className="stat-value text-sm">
                {participant.score ?? 0} pts
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ChallengeParticipants
