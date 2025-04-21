import { useCallback, useEffect, useRef } from 'react'
import { useSocket } from 'socket/use-socket'
import type {
  ChallengeNotificationType,
  NotificationKeyType,
  NotificationsChannelsType,
} from '@repo/schemas'

// biome-ignore lint/suspicious/noExplicitAny: should be any type
type Handlers = (data: ChallengeNotificationType<any>) => void

export const useChallengeNotifications = (
  channel: NotificationsChannelsType,
) => {
  const { listenEvent, removeListener } = useSocket()
  const notificationsHandlers = useRef<Record<NotificationKeyType, Handlers>>(
    {} as Record<NotificationKeyType, Handlers>,
  )

  const removeNotificationListener = useCallback(() => {
    removeListener(channel)
  }, [removeListener, channel])

  const registryNotification = useCallback(
    <TData>(
      type: NotificationKeyType,
      handler: (data: ChallengeNotificationType<TData>) => void,
    ) => {
      notificationsHandlers.current[type] = handler
    },
    [],
  )

  const unRegistryNotification = useCallback((type: NotificationKeyType) => {
    Reflect.deleteProperty(notificationsHandlers.current, type)
  }, [])

  const listenNotification = useCallback(
    <TNotificationData>(
      callback: (data: ChallengeNotificationType<TNotificationData>) => void,
    ) => {
      listenEvent(channel, callback)
    },
    [listenEvent, channel],
  )

  useEffect(() => {
    listenNotification((data) => {
      const handler = notificationsHandlers.current[data.type]
      if (handler) {
        handler(data)
      }
    })

    return () => {
      removeNotificationListener()
    }
  }, [listenNotification, removeNotificationListener])

  return {
    registryNotification,
    unRegistryNotification,
  }
}
