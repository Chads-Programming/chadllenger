import {
  MessageTypes,
  type ChallengeNotificationType,
  type CreateChallenge,
  type CreatedRoomPayload,
} from '@repo/schemas'
import { useModalTrigger } from 'components/modal/modal-trigger'
import { useNavigate } from 'react-router'
import { useSocket } from 'socket/use-socket'

export const CREATE_CHALLENGE_REF_ID = 'create-challenge-modal'

export const useCreateChallenge = () => {
  const { closeModal } = useModalTrigger()
  const navigate = useNavigate()
  const { socket, emitEvent } = useSocket()

  const onCreateRoomHandler = (
    response: ChallengeNotificationType<CreatedRoomPayload>,
  ) => {
    const { codename } = response.data

    navigate(`/challenge/${codename}`)
    closeModal(CREATE_CHALLENGE_REF_ID)
  }

  const createChallengeRoom = (data: CreateChallenge) => {
    emitEvent(MessageTypes.CREATE_ROOM, onCreateRoomHandler)
  }

  return {
    socket,
    createChallengeRoom,
  }
}
