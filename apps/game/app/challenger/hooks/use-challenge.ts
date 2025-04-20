import {
  ChallengeEvents,
  MessageTypes,
  type CreateChallenge,
  type CreatedRoomPayload,
  type PlayerJoinedGamePayload,
} from '@repo/schemas'
import { useCallback } from 'react'
import { useSocket } from 'socket/use-socket'

export const CREATE_CHALLENGE_REF_ID = 'create-challenge-modal'

export const useChallenge = () => {
  const { socket, emitEvent, listenEvent, removeListener } = useSocket()

  const createChallengeRoom = (data: CreateChallenge) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    emitEvent(MessageTypes.CREATE_ROOM, data as any)
  }

  const onCreatedRoom = useCallback(
    (callback: (data: CreatedRoomPayload) => void) => {
      listenEvent(ChallengeEvents.NOTIFICATIONS, callback)
    },
    [listenEvent],
  )

  const onPlayerJoinedGame = (
    callback: (data: PlayerJoinedGamePayload) => void,
  ) => {
    listenEvent(ChallengeEvents.NOTIFICATIONS, callback)
  }

  const removeChallengeNotification = useCallback(() => {
    removeListener(ChallengeEvents.NOTIFICATIONS)
  }, [removeListener])

  return {
    socket,
    createChallengeRoom,
    onCreatedRoom,
    onPlayerJoinedGame,
    removeChallengeNotification,
  }
}
