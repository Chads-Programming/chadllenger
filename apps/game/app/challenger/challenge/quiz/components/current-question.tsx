import type { IQuestQuizChallenge } from '@repo/schemas'
import { getEmojiById } from 'utils/emoji'
import { cn } from 'lib/utils'

interface Props {
  quest: IQuestQuizChallenge
  onAnswer: (optionId: string) => void
  selectedAnswer: string | null
}

const CurrentQuestion = ({ quest, selectedAnswer, onAnswer }: Props) => {
  const handleAnswer = (optionId: string) => {
    onAnswer(optionId)
  }

  return (
    <section className="min-h-full flex items-center justify-center p-4">
      <div className="card backdrop-blur-lg bg-base-200/30 shadow-2xl max-w-4xl w-full border border-base-300">
        <article className="card-body">
          <div className="mb-8">
            <div className="card bg-gradient-to-br from-primary/25 to-secondary/10 mb-6">
              <div className="card-body">
                <h2 className="text-xl font-semibold leading-relaxed">
                  {quest.question.question}
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {quest.question.options.map((option, index) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    'btn btn-active w-full justify-start text-left h-auto py-4 px-6 transition-all duration-300',
                    {
                      'btn-ghost hover:bg-primary/40': selectedAnswer === null,
                      'btn-disabled opacity-50': selectedAnswer !== null,
                    },
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl"> {getEmojiById(index)}</div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          className="radio radio-primary radio-sm"
                          checked={selectedAnswer === option.id}
                          readOnly
                        />
                        <span className="font-medium text-left">
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default CurrentQuestion
