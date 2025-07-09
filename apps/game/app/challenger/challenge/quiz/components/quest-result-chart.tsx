import type { IQuestHistory } from '@repo/schemas'
import { useMemo } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'
import * as emoji from 'utils/emoji'

interface Props {
  results: IQuestHistory[]
}

const QuestResultChart = ({ results }: Props) => {
  const data = useMemo(() => {
    if (!results) return []

    const resultsPerAnswer = results.reduce(
      (acc: Record<string, { name: string; amt: number }>, result, index) => {
        const questOption = acc[result.participantAnswer]

        if (!questOption) {
          acc[result.questionId] = {
            name: emoji.getEmojiById(index),
            amt: 1,
          }
        } else {
          acc[result.questionId] = {
            ...questOption,
            amt: questOption.amt + 1,
          }
        }

        return acc
      },
      {},
    )

    return Object.values(resultsPerAnswer)
  }, [results])

  return (
    <ResponsiveContainer width={250} height={250} className="w-full h-full">
      <BarChart width={150} height={150} data={data}>
        <Bar dataKey="amt" fill="var(--color-primary)" />
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default QuestResultChart
