import { useForm } from 'react-hook-form'
import { Difficult, type CreateChallenge, challengeSchema } from '@repo/schemas'
import { useUser } from 'providers/user-provider'
import { Trophy } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalContainer } from 'components/modal/modal'

interface Props {
  onCreateChallenge: (data: CreateChallenge) => void
}

export const CreateChallengeForm = ({ onCreateChallenge }: Props) => {
  const { setUsername, username } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChallenge>({
    defaultValues: {
      difficulties: [],
      creatorName: username || '',
    },
    resolver: zodResolver(challengeSchema),
  })

  const selectedDifficulties = watch('difficulties', [])

  const difficulties = [
    Difficult.Easy,
    Difficult.Medium,
    Difficult.Hard,
    Difficult.Chad,
  ]

  const onSubmit = (data: CreateChallenge) => {
    if (!username) {
      setUsername(data.creatorName)
    }
    onCreateChallenge(data)
  }

  const handleDifficultyToggle = (difficulty: Difficult) => {
    const updated = selectedDifficulties.includes(difficulty)

    if (updated) {
      setValue(
        'difficulties',
        selectedDifficulties.filter((d) => d !== difficulty),
        { shouldValidate: true },
      )

      return
    }

    setValue('difficulties', [...selectedDifficulties, difficulty], {
      shouldValidate: true,
    })
  }

  return (
    <ModalContainer id="create-challenge-modal">
      <ModalContainer.Header>
        <header className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold dark:text-white text-secondary">
            Create Challenge
          </h1>
        </header>
      </ModalContainer.Header>
      <ModalContainer.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Challenge Title</legend>
            <input
              type="text"
              className="input w-full"
              {...register('title')}
              placeholder="My awesome challenge"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </fieldset>

          <div className="w-full">
            <div className="block text-sm font-medium fieldset-legend mb-2">
              Difficulty Levels
            </div>
            <div className="grid grid-cols-2 gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => handleDifficultyToggle(difficulty)}
                  className={`btn
              ${
                selectedDifficulties?.includes(difficulty)
                  ? 'btn-info'
                  : 'btn-base'
              }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
            {errors.difficulties && (
              <p className="mt-1 text-sm text-red-600">
                {errors.difficulties.message}
              </p>
            )}
          </div>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Creator Username</legend>
            <input
              type="text"
              className="input w-full"
              {...register('creatorName')}
              placeholder="Enter your username"
            />
            {errors.creatorName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.creatorName.message}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            className="w-full btn btn-primary py-2 px-4 text-lg font-semibold"
          >
            Create Challenge
          </button>
        </form>
      </ModalContainer.Content>
    </ModalContainer>
  )
}
