import { useUser } from 'providers/user-provider'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL

type SocketContext = {
  socket: Socket | null
  isConnected: boolean
  listenEvent: <TNotification>(
    event: string,
    callback: (data: TNotification) => void,
  ) => void
  emitEvent: <TData, TResponse>(
    event: string,
    data?: TData,
    ack?: (response: TResponse) => void,
  ) => void
  removeListener: (event: string) => void
}

export const SocketContext = createContext<SocketContext | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { userID } = useUser()
  const socketRef = useRef<Socket>(null)
  const [isConnected, setIsConnected] = useState(false)

  const emitEvent = useCallback(
    <TData, TResponse>(
      event: string,
      data?: TData,
      ack?: (response: TResponse) => void,
    ) => {
      if (isConnected) {
        socketRef?.current?.emit(event, data, ack || (() => {}))
        return
      }
    },
    [isConnected],
  )

  const listenEvent = useCallback(
    <TNotification,>(
      event: string,
      callback: (data: TNotification) => void,
    ) => {
      if (isConnected) {
        socketRef?.current?.on(event, callback)
      }
    },
    [isConnected],
  )

  const removeListener = useCallback(
    (event: string) => {
      if (isConnected) {
        socketRef?.current?.off(event)
      }
    },
    [isConnected],
  )

  useEffect(() => {
    if (!userID) {
      return
    }
    socketRef.current = io(`${SOCKET_SERVER_URL}/challenge`, {
      transports: ['websocket'],
      withCredentials: true,
    })

    socketRef.current?.on('connect', () => {
      setIsConnected(true)
    })

    socketRef.current?.on('disconnect', () => {
      setIsConnected(false)
    })

    socketRef.current?.on('connect_error', (error) => {
      console.error('Connection error:', error)
    })

    socketRef.current?.on('error', (error) => {
      console.error(error)
    })

    return () => {
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [userID])

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        emitEvent,
        listenEvent,
        removeListener,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
