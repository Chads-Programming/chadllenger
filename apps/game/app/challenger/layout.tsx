import { UserProvider } from 'providers/user-provider'
import { Outlet } from 'react-router'
import { SocketProvider } from 'socket/socket-provider'
import { LobbyProvider } from './lobby/providers/lobby.provider'

const ChallengeLayout = () => {
  return (
    <>
      <UserProvider>
        <SocketProvider>
          <LobbyProvider>
            <Outlet />
          </LobbyProvider>
        </SocketProvider>
      </UserProvider>
    </>
  )
}

export default ChallengeLayout
