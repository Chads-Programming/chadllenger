import { UserProvider } from 'providers/user-provider'
import { Outlet } from 'react-router'
import { SocketProvider } from 'socket/socket-provider'

const ChallengeLayout = () => {
  return (
    <UserProvider>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </UserProvider>
  )
}

export default ChallengeLayout
