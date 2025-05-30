import auth from 'api/auth'
import type React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { generateUsername } from '../utils/username-generator'

interface UserContextType {
  userID: string
  username: string
  changeUsername: (username: string) => void
  generateRandomUsername: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('username') || ''
  })

  const [userID, setUserId] = useState<string>(() => {
    return localStorage.getItem('sessionId') || ''
  })

  const changeUserID = useCallback((userID: string) => {
    setUserId(userID)
    localStorage.setItem('sessionId', userID)
  }, [])

  const changeUsername = useCallback((username: string) => {
    setUsername(username)
    localStorage.setItem('username', username)
  }, [])

  const generateRandomUsername = useCallback(() => {
    const newUsername = generateUsername()
    changeUsername(newUsername)
  }, [changeUsername])

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId')
    const storedUsername = localStorage.getItem('username')

    if (!storedUsername) {
      generateRandomUsername()
    }

    if (storedSessionId) {
      setUserId(storedSessionId)
      return
    }

    auth.createSession().then(({ sessionId }) => {
      changeUserID(sessionId)
    })
  }, [changeUserID, generateRandomUsername])

  return (
    <UserContext.Provider
      value={{ userID, username, changeUsername, generateRandomUsername }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('User not found')
  }
  return context
}
