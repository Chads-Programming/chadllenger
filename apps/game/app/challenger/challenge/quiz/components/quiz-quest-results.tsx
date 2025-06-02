import type { IQuestHistory, IQuestionQuiz } from '@repo/schemas'
import QuestResultChart from './quest-result-chart'
import * as emoji from 'utils/emoji'
import { cn } from 'lib/utils'
import { Check } from 'lucide-react'
import ChallengeStrings from '~/challenger/common/strings/challenge'

type Props = {
  results: IQuestHistory[]
  options: IQuestionQuiz['options']
}

const QuizQuestResults = ({ results, options }: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-lg font-bold">
        {ChallengeStrings.challenge.questResults.title}
      </h4>
      <div className="flex flex-col gap-4 w-fit">
        <QuestResultChart results={results} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <ul className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <li
              className={cn(
                'flex items-center gap-2 justify-center bg-active',
                option.isCorrectAnswer && 'bg-success',
              )}
              key={option.id}
            >
              <span>{emoji.getEmojiById(index)}</span>
              <span>{option.text}</span>
              {option.isCorrectAnswer && <Check className="w-4 h-4" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default QuizQuestResults
