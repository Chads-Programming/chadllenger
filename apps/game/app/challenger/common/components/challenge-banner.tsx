import {
  type ChallengeType,
  type ChallengeStatusType,
  Status,
} from '@repo/schemas'
import QuestCountdown from '~/challenger/challenge/quiz/components/quest-countdown'
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
}

const ChallengeBanner = ({ title, codename, type, status }: Props) => {
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
    <div className="inline-flex relative  h-32 items-center">
      <div className="z-20 absolute top-1 left-[35%] right-[35%] rounded-xl border border-base-300 flex justify-center text-center bg-neutral-950">
        <AuroraText className="text-4xl font-bold">{title}</AuroraText>
      </div>
      <div className="relative mt-12 w-full h-full flex items-center justify-center backdrop-blur-sm rounded-md shadow-lg border border-base-300 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex justify-center items-center gap-2 w-full h-full overflow-hidden">
          {match(status)
            .with(Status.PENDING, () => (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-info text-3xl font-bold"
                  onClick={copyCodenameToClipboard}
                >
                  {codename}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost py-8"
                  onClick={copyLinkToClipboard}
                >
                  <Link className="w-10 h-10" />
                </button>
              </div>
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
      </div>
    </div>
  )
}

export default ChallengeBanner
