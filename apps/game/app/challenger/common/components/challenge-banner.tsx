import {
  type ChallengeType,
  type ChallengeStatusType,
  Status,
} from '@repo/schemas'
import { AuroraText } from 'components/ui/aurora-text'
import { useToast } from 'hooks/use-toast'
import { Link } from 'lucide-react'
import ChallengeStrings from '../strings/challenge'
import { match, P } from 'ts-pattern'

interface Props {
  title: string
  codename: string
  type: ChallengeType
  status: ChallengeStatusType
  renderOnStart: React.ReactNode
}

const ChallengeBanner = ({
  title,
  codename,
  type,
  status,
  renderOnStart,
}: Props) => {
  const { toast } = useToast()
  const copyCodenameToClipboard = () => {
    navigator.clipboard.writeText(codename)
    toast(ChallengeStrings.challenge.banner.clipboard, { type: 'info' })
  }
  const copyLinkToClipboard = () => {
    const challengeUrl = `${window.location.origin}/challenge/${type.toLowerCase()}/${codename}`
    navigator.clipboard.writeText(challengeUrl)

    toast(ChallengeStrings.challenge.banner.linkClipboard, { type: 'info' })
  }

  return (
    <div className="inline-flex h-32 items-center bg-base-200/25 backdrop-blur-sm rounded-md border border-base-300">
      <div className="p-4 border-r border-base-300 min-w-[18rem] h-full flex items-center">
        <AuroraText className="text-5xl font-bold">{title}</AuroraText>
      </div>
      <div className="flex justify-center items-center gap-2 w-full h-full bg-base-300/40 backdrop-blur-sm  overflow-hidden">
        {match(status)
          .with(Status.PENDING, () => (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-outline text-3xl font-bold"
                onClick={copyCodenameToClipboard}
              >
                {codename}
              </button>
              <button
                type="button"
                className="btn btn-link p-3"
                onClick={copyLinkToClipboard}
              >
                <Link className="w-10 h-10" />
              </button>
            </div>
          ))
          .with(P.union(Status.IN_PROGRESS, Status.AWAITING_NEXT_QUEST), () => (
            <div className="inline-flex items-center justify-center h-full">
              <h3 className="text-3xl font-bold mr-4">
                {ChallengeStrings.challenge.banner.timeRemaining}
              </h3>
              {renderOnStart}
            </div>
          ))
          .with(Status.FINISHED, () => (
            <h3 className="text-3xl font-bold">
              {ChallengeStrings.challenge.finishedQuest}
            </h3>
          ))
          .exhaustive()}
      </div>
    </div>
  )
}

export default ChallengeBanner
