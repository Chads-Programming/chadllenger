import {
    MessageTypes,
    NotificationsChannels,
    NotificationsType,
    Status,
    type ChallengeNotificationType,
    type IChallengeState,
    type JoinChallengeRoom,
    type PlayerJoinedGame,
  } from '@repo/schemas'
  import { useEffect, useReducer } from 'react'
  import challengeApi from 'api/challenge'
  import { useChallengeNotifications } from '../../common/hooks/use-challenge-notifications'
  import { ACTIONS, INITIAL_STATE, reducer } from './quiz-reducer'
  import { useToast } from 'hooks/use-toast'
  import ChallengeStrings from '../../common/strings/challenge'
  import { useUser } from 'providers/user-provider'
  import { useNavigate } from 'react-router'
  import { useSocket } from 'socket/use-socket'
  
  export const useQuiz = (codename: string) => {
    const [challengeState, dispatch] = useReducer(reducer, INITIAL_STATE)
    const { emitEvent } = useSocket()
    const { username } = useUser()
  
    const joinChallengeRoom = (data: JoinChallengeRoom) => {
      emitEvent(MessageTypes.JOIN_CHALLENGE_ROOM, data)
    }
  
    const navigate = useNavigate()
  
    const { registryNotification, unRegistryNotification } =
      useChallengeNotifications(NotificationsChannels.CHALLENGE_NOTIFICATIONS)
    const { toast } = useToast()
  
    const handleChallengeInfo = (challenge: IChallengeState) => {
      if (!challenge || challenge?.status === Status.FINISHED) {
        navigate('/challenge/not-found')
  
        return
      }
  
      joinChallengeRoom({ type:"Clash", codename, username })
  
      dispatch({ type: ACTIONS.LOAD_INITIAL_STATE, payload: challenge })
    }
  
    const handleJoinParticipant = (
      notification: ChallengeNotificationType<PlayerJoinedGame>,
    ) => {
      const participant = notification.data
  
      dispatch({
        type: ACTIONS.JOIN_PLAYER,
        payload: participant,
      })
  
      toast(
        ChallengeStrings.playerNotifications.playerJoined.replace(
          '$1',
          participant.name,
        ),
      )
    }
  
    // biome-ignore lint/correctness/useExhaustiveDependencies: ignore handleChallengeInfo
    useEffect(() => {
      challengeApi.getChallengeByCodename(codename).then(handleChallengeInfo)
    }, [codename])
  
    // biome-ignore lint/correctness/useExhaustiveDependencies: ignore handleJoinParticipant
    useEffect(() => {
      registryNotification<PlayerJoinedGame>(
        NotificationsType.PLAYER_JOINED_GAME,
        handleJoinParticipant,
      )
  
      return () => {
        unRegistryNotification(NotificationsType.PLAYER_JOINED_GAME)
      }
    }, [registryNotification, unRegistryNotification])
  
    return {
      challengeState,
    }
  }
  