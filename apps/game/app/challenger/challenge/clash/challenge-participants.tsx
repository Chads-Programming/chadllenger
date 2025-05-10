import type { IParticipant } from '@repo/schemas'
import Avatar from 'components/ui/avatar'
import { Users } from 'lucide-react'
import { memo } from 'react'
import ChallengeStrings from '../../common/strings/challenge'

interface Props {
  participants: IParticipant[]
}

const ChallengeParticipants = memo(({ participants }: Props) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-sm border border-base-300">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {ChallengeStrings.challenge.participants.title}
          </h3>
          <div className="flex items-center text-primary">
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
              className="flex items-center space-x-2 gap-2 justify-between"
            >
              <div className="inline-flex gap-1 items-center text-sm text-pretty">
                <Avatar id={participant.id} name={participant.name} />
                <span className="font-semibold">{participant.name}</span>
              </div>
              <div className="stat-value text-sm text-primary">
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
