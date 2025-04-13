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
  emitEvent: <TData>(event: string, callback: (data: TData) => void) => void
  removeListener: (event: string) => void
}

export const SocketContext = createContext<SocketContext | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket>(null)
  const [isConnected, setIsConnected] = useState(false)

  const emitEvent = useCallback(
    <TData,>(event: string, data?: TData) => {
      if (isConnected) {
        socketRef?.current?.emit(event, data)
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
    socketRef.current = io(`${SOCKET_SERVER_URL}/challenge`, {
      transports: ['websocket'],
    })

    socketRef.current?.on('connect', () => {
      setIsConnected(true)
    })

    socketRef.current?.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [])

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
