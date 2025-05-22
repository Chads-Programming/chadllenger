import {
  MessageTypes,
  NotificationsChannels,
  NotificationsType,
  Status,
  type ChallengeNotificationType,
  type IChallengeState,
  type IQuestQuizChallengeState,
  type PlayerJoinedGame,
} from '@repo/schemas'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import challengeApi from 'api/challenge'
import { useChallengeNotifications } from '../../common/hooks/use-challenge-notifications'
import { ACTIONS, INITIAL_STATE, reducer } from './quiz-reducer'
import { useToast } from 'hooks/use-toast'
import ChallengeStrings from '../../common/strings/challenge'
import { useSocket } from 'socket/use-socket'
import { useNavigate } from 'react-router'
import { useUser } from 'providers/user-provider'

export interface IQuizContext {
  challengeState: IQuestQuizChallengeState
  startChallenge: () => void
}

const QuizContext = createContext<IQuizContext | undefined>(undefined)

interface Props {
  codename: string
  children: React.ReactNode
}

export const QuizProvider = ({ codename, children }: Props) => {
  const { username } = useUser()
  const [challengeState, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { emitEvent } = useSocket()

  const { toast } = useToast()
  const navigate = useNavigate()

  const { registryNotification, unRegistryNotification } =
    useChallengeNotifications(NotificationsChannels.CHALLENGE_NOTIFICATIONS)

  const handleChallengeInfo = (challenge: IChallengeState) => {
    if (!challenge || challenge?.status === Status.FINISHED) {
      navigate('/challenge/not-found')

      return
    }

    emitEvent(MessageTypes.JOIN_CHALLENGE_ROOM, {
      type: 'Clash',
      codename,
      username,
    })

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

  const startChallenge = useCallback(() => {
    emitEvent(MessageTypes.START_CHALLENGE, {
      codename,
    })
  }, [emitEvent, codename])

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

  return (
    <QuizContext.Provider value={{ challengeState, startChallenge }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(QuizContext)

  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }

  return context
}
