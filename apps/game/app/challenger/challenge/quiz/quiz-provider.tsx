import {
  ChallengeType,
  MessageTypes,
  NotificationsChannels,
  NotificationsType,
  Status,
  type AnswerQuest,
  type ChallengeNotificationType,
  type IChallengeState,
  type IQuestHistory,
  type IQuizChallengeState,
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
  challengeState: IQuizChallengeState
  startChallenge: () => void
  sendAnswer: (optionId: string) => void
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

  const isChallengeLoaded = Boolean(challengeState.id)

  const { toast } = useToast()
  const navigate = useNavigate()

  const { registryNotification, unRegistryNotification } =
    useChallengeNotifications(NotificationsChannels.CHALLENGE_NOTIFICATIONS)

  const navigateToNotFound = useCallback(() => {
    navigate('/challenge/not-found')
  }, [navigate])

  const handleChallengeInfo = useCallback(
    (challenge: IChallengeState) => {
      if (!challenge || challenge?.status === Status.FINISHED) {
        navigateToNotFound()
        return
      }

      emitEvent(MessageTypes.JOIN_CHALLENGE_ROOM, {
        type: ChallengeType.Quiz.toLowerCase(),
        codename,
        username,
      })

      dispatch({ type: ACTIONS.LOAD_INITIAL_STATE, payload: challenge })
    },
    [emitEvent, username, codename, navigateToNotFound],
  )

  const handleJoinParticipant = useCallback(
    (notification: ChallengeNotificationType<PlayerJoinedGame>) => {
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
    },
    [toast],
  )

  const handleStartingGame = useCallback(
    (notification: ChallengeNotificationType<IChallengeState>) => {
      dispatch({
        type: ACTIONS.STARTING_CHALLENGE,
        payload: notification.data,
      })
    },
    [],
  )

  const handleStartedRound = useCallback(
    (notification: ChallengeNotificationType<IChallengeState>) => {
      dispatch({
        type: ACTIONS.STARTED_ROUND,
        payload: notification.data,
      })

      toast(ChallengeStrings.challenge.startedQuest)
    },
    [toast],
  )

  const handleFinishQuest = useCallback(
    (
      notification: ChallengeNotificationType<
        IChallengeState['participantsQuestHistory']
      >,
    ) => {
      dispatch({
        type: ACTIONS.FINISH_QUEST,
        payload: notification.data,
      })
    },
    [],
  )

  const startChallenge = useCallback(() => {
    emitEvent(MessageTypes.START_CHALLENGE, codename)
  }, [emitEvent, codename])

  const sendAnswer = useCallback(
    (optionId: string) => {
      const answer: AnswerQuest = {
        answer: optionId,
        questionId: challengeState.currentChallenge,
        codename,
      }

      emitEvent(
        MessageTypes.QUIZ_SEND_ANSWER,
        answer,
        (participantQuestHistory: IQuestHistory) => {
          console.log('participantQuestHistory', participantQuestHistory)

          dispatch({
            type: ACTIONS.MARK_QUEST_ANSWERED,
            payload: participantQuestHistory,
          })
        },
      )
    },
    [emitEvent, challengeState, codename],
  )

  useEffect(() => {
    challengeApi
      .getChallengeByCodename(codename)
      .then(handleChallengeInfo)
      .catch(navigateToNotFound)
  }, [codename, handleChallengeInfo, navigateToNotFound])

  useEffect(() => {
    registryNotification<PlayerJoinedGame>(
      NotificationsType.PLAYER_JOINED_GAME,
      handleJoinParticipant,
    )
    registryNotification(
      NotificationsType.STARTING_CHALLENGE,
      handleStartingGame,
    )
    registryNotification(NotificationsType.STARTED_ROUND, handleStartedRound)
    registryNotification(NotificationsType.FINISH_QUEST, handleFinishQuest)

    return () => {
      unRegistryNotification(NotificationsType.PLAYER_JOINED_GAME)
      unRegistryNotification(NotificationsType.STARTED_ROUND)
      unRegistryNotification(NotificationsType.FINISH_QUEST)
      unRegistryNotification(NotificationsType.STARTING_CHALLENGE)
    }
  }, [
    registryNotification,
    unRegistryNotification,
    handleJoinParticipant,
    handleStartedRound,
    handleFinishQuest,
    handleStartingGame,
  ])

  return (
    <QuizContext.Provider
      value={{ challengeState, startChallenge, sendAnswer }}
    >
      {isChallengeLoaded ? children : null}
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
