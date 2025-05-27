import type { IParticipant } from '@repo/schemas'
import Avatar from 'components/ui/avatar'
import { memo } from 'react'
import ChallengeStrings from '../strings/challenge'
import { Users } from 'lucide-react'

interface Props {
  participants: IParticipant[]
}

const ChallengeParticipants = memo(({ participants }: Props) => {
  return (
    <div className="bg-base-200/80 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{ChallengeStrings.challenge.participants.title}</span>
          </h3>
        </div>
      </div>
      <div className="p-4">
        <ul className="space-y-2 flex flex-wrap gap-2">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="inline-flex gap-1 justify-start items-center text-sm text-pretty"
            >
              <Avatar id={participant.id} name={participant.name} />
              <span className="font-semibold">{participant.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ChallengeParticipants
