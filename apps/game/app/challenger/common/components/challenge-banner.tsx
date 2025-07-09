import {
  type ChallengeType,
  type ChallengeStatusType,
  Status,
} from '@repo/schemas'
import QuestCountdown from '~/challenger/challenge/quiz/components/quest-countdown'
import { AuroraText } from 'components/ui/aurora-text'
import { useToast } from 'hooks/use-toast'
import ChallengeStrings from '../strings/challenge'
import { match, P } from 'ts-pattern'

interface Props {
  title: string
  codename: string
  type: ChallengeType
  status: ChallengeStatusType
}

const ChallengeBanner = ({ title, codename, type, status }: Props) => {
  const { toast } = useToast()
  const copyCodenameToClipboard = () => {
    navigator.clipboard.writeText(codename)
    toast(ChallengeStrings.challenge.banner.clipboard, { type: 'info' })
  }

  return (
    <div className="flex flex-row items-center justify-center p-6 gap-4 w-full">
      <AuroraText className="text-4xl font-bold">
        {title.toUpperCase()}
      </AuroraText>
      {match(status)
        .with(Status.PENDING, () => (
          <button
            type="button"
            className="btn btn-secondary text-3xl font-bold text-black self-center"
            onClick={copyCodenameToClipboard}
          >
            {codename}
          </button>
        ))
        .with(
          P.union(
            Status.STARTING,
            Status.QUEST_IN_PROGRESS,
            Status.AWAITING_NEXT_QUEST,
          ),
          () => (
            <div className="inline-flex items-center justify-center h-full">
              <h3 className="text-3xl font-bold mr-4">
                {ChallengeStrings.challenge.banner.timeRemaining}
              </h3>
              <QuestCountdown />
            </div>
          ),
        )
        .with(Status.FINISHED, () => (
          <h3 className="text-3xl font-bold">
            {ChallengeStrings.challenge.finishedQuest}
          </h3>
        ))
        .exhaustive()}
    </div>
  )
}

export default ChallengeBanner
