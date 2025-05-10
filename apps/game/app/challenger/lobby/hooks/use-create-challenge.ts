import {
  MessageTypes,
  type ChallengeNotificationType,
  type CreateChallenge,
  type CreatedRoomPayload,
} from '@repo/schemas'
import { useModalTrigger } from 'components/modal/modal-trigger'
import { useToast } from 'hooks/use-toast'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useSocket } from 'socket/use-socket'

import ChallengeStrings from '~/challenger/common/strings/challenge'

export const CREATE_CHALLENGE_REF_ID = 'create-challenge-modal'

export const useCreateChallenge = () => {
  const { closeModal } = useModalTrigger()
  const navigate = useNavigate()
  const { socket, emitEvent } = useSocket()
  const toastIdRef = useRef<string | number | null>(null)

  const { toast, dismiss } = useToast()

  const onCreateRoomHandler = (
    response: ChallengeNotificationType<CreatedRoomPayload>,
  ) => {
    console.log('onCreateRoomHandler', response)
    const { codename } = response.data
    
    dismiss(toastIdRef.current as string | number)
    
    toast(ChallengeStrings.create.success, {
      type: 'info',
      dissmissAction: true,
    })
    console.log('nashe :v')
    navigate(`/challenge/${codename}`)
    closeModal(CREATE_CHALLENGE_REF_ID)
  }

  const createChallengeRoom = (data: CreateChallenge) => {
    toastIdRef.current = toast(ChallengeStrings.create.loading, {
      type: 'loading',
    })
    emitEvent(MessageTypes.CREATE_ROOM, data, onCreateRoomHandler)
  }

  return {
    socket,
    createChallengeRoom,
  }
}
