import {
  type ChallengeType,
  type ChallengeStatusType,
  Status,
} from '@repo/schemas'
import { AuroraText } from 'components/ui/aurora-text'
import { useToast } from 'hooks/use-toast'
import { Link } from 'lucide-react'

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
    toast('Copied codename to clipboard', { type: 'info' })
  }

  const copyLinkToClipboard = () => {
    const challengeUrl = `${window.location.origin}/challenge/${type.toLowerCase()}/${codename}`
    navigator.clipboard.writeText(challengeUrl)

    toast('Challenge link copied to clipboard', { type: 'info' })
  }

  return (
    <div className="inline-flex h-32 items-center gap-4 bg-base-200/25 backdrop-blur-sm rounded-md border border-base-300">
      <div className="p-4">
        <AuroraText className="text-5xl font-bold">{title}</AuroraText>
      </div>
      {status === Status.PENDING ? (
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
      ) : (
        renderOnStart
      )}
    </div>
  )
}

export default ChallengeBanner
