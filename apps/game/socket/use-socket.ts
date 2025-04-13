import { useContext } from 'react'
import { SocketContext } from './socket-provider'

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('Socket context not found')
  }

  return context
}
