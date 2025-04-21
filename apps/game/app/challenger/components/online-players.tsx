import { AnimatedShinyText } from 'components/animated-shiny-text'
import { cn } from 'lib/utils'
import { useState, useEffect } from 'react'
import {
  NotificationsChannels,
  NotificationsType,
  type PlayerJoinedGamePayload,
} from '@repo/schemas'
import { useSocket } from 'socket/use-socket'
import { LobbyStrings } from '../strings/lobby'
import lobbyApi from 'api/lobby'
import { useChallengeNotifications } from '../hooks/use-challenge-notifications'

export const OnlinePlayers = () => {
  const socket = useSocket()
  const [onlinePlayers, setOnlinePlayers] = useState(0)
  const { registryNotification, unRegistryNotification } =
    useChallengeNotifications(NotificationsChannels.LOBBY_NOTIFICATIONS)

  useEffect(() => {
    if (socket.isConnected) {
      lobbyApi.getOnlineTotalOnline().then(setOnlinePlayers)
    }
  }, [socket.isConnected])

  useEffect(() => {
    registryNotification<PlayerJoinedGamePayload>(
      NotificationsType.CONNECTED_PLAYERS,
      (notification) => {
        setOnlinePlayers(notification.data.totalOnline)
      },
    )

    return () => {
      unRegistryNotification(NotificationsType.CONNECTED_PLAYERS)
    }
  }, [registryNotification, unRegistryNotification])

  return (
    <div className="z-10 flex items-center justify-center">
      <div
        className={cn(
          'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>
            {LobbyStrings.onlinePlayers.title}: {onlinePlayers}
          </span>
        </AnimatedShinyText>
      </div>
    </div>
  )
}
