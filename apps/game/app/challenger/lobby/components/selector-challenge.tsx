import { LobbyCard } from './lobby-card'
import { useLobby } from '../providers/lobby.provider'
import { ChallengeType } from '@repo/schemas'
import { LobbyStrings } from '~/challenger/common/strings/lobby'

export const SelectChallengeType = () => {
  const { saveLastChallengeType } = useLobby()

  return (
    <section className="flex flex-wrap justify-center gap-8 mb-6">
      <LobbyCard
        title="Chad Quest"
        onClick={() => saveLastChallengeType(ChallengeType.Quiz)}
        description={LobbyStrings.challengeType[ChallengeType.Quiz].description}
        banner={LobbyStrings.challengeType[ChallengeType.Quiz].banner}
      />

      <LobbyCard
        title="Clash of Code"
        onClick={() => saveLastChallengeType(ChallengeType.Clash)}
        description={
          LobbyStrings.challengeType[ChallengeType.Clash].description
        }
        banner={LobbyStrings.challengeType[ChallengeType.Clash].banner}
      />
    </section>
  )
}
