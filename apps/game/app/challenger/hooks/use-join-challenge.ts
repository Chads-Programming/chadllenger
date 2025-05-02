import { MessageTypes, type JoinChallengeRoom } from '@repo/schemas'
import { useSocket } from 'socket/use-socket'

export const useJoinChallenge = () => {
  const { socket, emitEvent } = useSocket()

  const joinChallengeRoom = (
    data: JoinChallengeRoom,
    onSuccess: () => void,
  ) => {
    emitEvent(MessageTypes.JOIN_CHALLENGE_ROOM, data, onSuccess)
  }

  return {
    socket,
    joinChallengeRoom,
  }
}
