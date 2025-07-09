import {
  NotificationsChannels,
  NotificationsType,
  type ChallengeNotificationType,
  type PlayerJoinedGame,
  type PlayerLeftGame,
} from '@repo/schemas'
import { useChallengeNotifications } from '../hooks/use-challenge-notifications'
import { useCallback, useEffect, useState } from 'react'
import Notification, { type NotificationItem } from 'components/ui/notification'
import { AnimatedList } from 'components/ui/animated-list'
import dateHelpers from 'lib/date-helpers'
import { useDebounceCallback } from 'hooks/use-debounce-callback'
import ChallengeStrings from '../strings/challenge'

const PlayerNotificationBox = () => {
  const [notifications, setNotification] = useState<NotificationItem[]>([])
  const debounce = useDebounceCallback()

  const { registryNotification, unRegistryNotification } =
    useChallengeNotifications(NotificationsChannels.CHALLENGE_NOTIFICATIONS)
    
  const popNotifications = useCallback(() => {
    setNotification((prev) => prev.slice(1))
  }, [])

  const addPlayerNotification = useCallback(
    (
      receivedNotification: ChallengeNotificationType<
        PlayerJoinedGame | PlayerLeftGame
      >,
    ) => {
      const joined =
        receivedNotification.type === NotificationsType.PLAYER_JOINED_GAME

      const notification: NotificationItem = {
        id: receivedNotification.id,
        icon: ChallengeStrings.playerNotifications.iconEmote,
        name: joined
          ? ChallengeStrings.playerNotifications.playerJoined
          : ChallengeStrings.playerNotifications.playerLeft,
        description: receivedNotification.messageType,
        color: ChallengeStrings.playerNotifications.cardColor,
        time: dateHelpers.diffDatesToStringFromCurrentTime(
          receivedNotification.createdAt,
        ),
      }

      setNotification((prev) => [...prev, notification])
      debounce(popNotifications)
    },
    [debounce, popNotifications],
  )

  const handlePlayerJoinGameNotification = useCallback(
    (data: ChallengeNotificationType<PlayerJoinedGame>) => {
      addPlayerNotification(data)
    },
    [addPlayerNotification],
  )

  const handlePlayerLeftGameNotification = useCallback(
    (data: ChallengeNotificationType<PlayerLeftGame>) => {
      addPlayerNotification(data)
    },
    [addPlayerNotification],
  )

  useEffect(() => {
    registryNotification(
      NotificationsType.PLAYER_JOINED_GAME,
      handlePlayerJoinGameNotification,
    )
    registryNotification(
      NotificationsType.PLAYER_LEFT_GAME,
      handlePlayerLeftGameNotification,
    )

    return () => {
      unRegistryNotification(NotificationsType.PLAYER_JOINED_GAME)
      unRegistryNotification(NotificationsType.PLAYER_LEFT_GAME)
    }
  }, [
    registryNotification,
    unRegistryNotification,
    handlePlayerJoinGameNotification,
    handlePlayerLeftGameNotification,
  ])

  return (
    <AnimatedList className="absolute top-4 left-4 z-10">
      {notifications.map((notification, index) => (
        <Notification key={`${index}-${notification.time}`} {...notification} />
      ))}
    </AnimatedList>
  )
}

export default PlayerNotificationBox
