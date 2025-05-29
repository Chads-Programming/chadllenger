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
    <div className="bg-base-200/25 backdrop-blur-sm rounded-md border border-base-300">
      <div className="p-4">
        <div className="flex items-center justify-center">
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
              className="flex flex-col gap-2 items-center justify-center  text-sm text-pretty"
            >
              <Avatar id={participant.id} name={participant.name} />
              <span className="font-semibold w-full p-2 bg-secondary shadow rounded-lg min-w-24 text-center">
                {participant.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ChallengeParticipants
