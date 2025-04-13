import {
  ChallengeEvents,
  MessageTypes,
  type CreateChallenge,
  type CreatedRoomPayload,
  type PlayerJoinedGamePayload,
} from '@repo/schemas'
import { useSocket } from 'socket/use-socket'

export const useChallenge = () => {
  const { socket, emitEvent, listenEvent, removeListener } = useSocket()

  const createChallengeRoom = (data: CreateChallenge) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    emitEvent(MessageTypes.CREATE_ROOM, data as any)
  }

  const onCreatedRoom = (callback: (data: CreatedRoomPayload) => void) => {
    listenEvent(ChallengeEvents.NOTIFICATIONS, callback)
  }

  const onPlayerJoinedGame = (
    callback: (data: PlayerJoinedGamePayload) => void,
  ) => {
    listenEvent(ChallengeEvents.NOTIFICATIONS, callback)
  }

  const removePlayerJoinedGameListener = () => {
    removeListener(ChallengeEvents.NOTIFICATIONS)
  }

  return {
    socket,
    createChallengeRoom,
    onCreatedRoom,
    onPlayerJoinedGame,
    removePlayerJoinedGameListener,
  }
}
