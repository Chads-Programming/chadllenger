import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { ChallengeType } from '@repo/schemas'
import {
  LobbyStrings,
  type ChallengeStrings,
} from '~/challenger/common/strings/lobby'

type LobbyContextType = {
  challengeType: ChallengeType | null
  saveLastChallengeType: (challengeType: ChallengeType | null) => void
  lobbyTexts: ChallengeStrings
}

export const LobbyContext = createContext<LobbyContextType | undefined>(
  undefined,
)

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const saveLastChallengeType = useCallback(
    (challengeType: ChallengeType | null) => {
      setChallengeType(challengeType)
      localStorage.setItem('lastChallengeType', challengeType ?? '')
    },
    [],
  )

  const getLastChallengeType = useCallback(() => {
    return localStorage.getItem('lastChallengeType') as ChallengeType | null
  }, [])

  const [challengeType, setChallengeType] = useState<ChallengeType | null>(() =>
    getLastChallengeType(),
  )

  const lobbyTexts: ChallengeStrings = useMemo(() => {
    return !challengeType
      ? LobbyStrings.challengeType[ChallengeType.Clash]
      : LobbyStrings.challengeType[challengeType]
  }, [challengeType])

  // useEffect(() => {
  //   if (challengeType) {
  //     saveLastChallengeType(challengeType)
  //   }
  // }, [challengeType, saveLastChallengeType])

  return (
    <LobbyContext.Provider
      value={{
        challengeType,
        saveLastChallengeType,
        lobbyTexts,
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobby = () => {
  const context = useContext(LobbyContext)
  if (!context) {
    throw new Error('useLobby must be used within a LobbyProvider')
  }
  return context
}
