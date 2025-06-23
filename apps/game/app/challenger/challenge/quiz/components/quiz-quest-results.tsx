import type { IQuestHistory, IQuestionQuiz } from '@repo/schemas'
import QuestResultChart from './quest-result-chart'
import * as emoji from 'utils/emoji'
import { cn } from 'lib/utils'
import { CheckCircle } from 'lucide-react'
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
                'flex items-center gap-2 justify-center bg-active rounded-md p-2 border border-base-300',
                {
                  'bg-gradient-to-r from-primary/60 to-primary/20':
                    option.isCorrectAnswer,
                  'bg-secondary': !option.isCorrectAnswer,
                },
              )}
              key={option.id}
            >
              <span>{emoji.getEmojiById(index)}</span>
              <span>{option.text}</span>
              {option.isCorrectAnswer && (
                <CheckCircle className="w-6 h-6 text-primary" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default QuizQuestResults
