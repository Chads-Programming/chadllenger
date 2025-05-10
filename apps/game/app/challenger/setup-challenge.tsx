import { useForm } from 'react-hook-form'
import {
  type Difficult,
  type CreateChallenge,
  challengeSchema,
  ChallengeType,
} from '@repo/schemas'
import { useUser } from 'providers/user-provider'
import { Trophy } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalContainer } from 'components/modal/modal'
import { useCreateChallenge } from './lobby/hooks/use-create-challenge'
import ChallengeStrings from './common/strings/challenge'
import { DIFFICULTIES } from './consts'
import PlayerCard from './common/components/player-card'
import { useLobby } from './lobby/providers/lobby.provider'

export const SetupChallenge = () => {
  const { username } = useUser()
  const { createChallengeRoom } = useCreateChallenge()
  const { challengeType } = useLobby()
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
      type: challengeType || ChallengeType.Clash,
    },
    resolver: zodResolver(challengeSchema),
  })

  const selectedDifficulties = watch('difficulties', [])

  const onSubmit = (data: CreateChallenge) => {
    handleCreateChallenge(data)
  }
  const onUsernameChange = (username: string) => {
    setValue('creatorName', username)
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

  const handleCreateChallenge = (data: CreateChallenge) => {
    createChallengeRoom(data)
  }

  return (
    <ModalContainer id="create-challenge-modal">
      <ModalContainer.Header>
        <header className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold dark:text-white text-secondary">
            {ChallengeStrings.create.title}
          </h1>
        </header>
      </ModalContainer.Header>
      <ModalContainer.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-base">
              {ChallengeStrings.create.name.label}
            </legend>
            <input
              type="text"
              className="input w-full"
              {...register('title')}
              placeholder={ChallengeStrings.create.name.placeholder}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </fieldset>

          <div className="w-full">
            <legend className="block font-medium fieldset-legend">
              {ChallengeStrings.create.difficulty.label}
            </legend>
            <p className="text-sm text-gray-300 mb-2">
              {ChallengeStrings.create.difficulty.description}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DIFFICULTIES.map((difficulty) => (
                <button
                  key={difficulty.value}
                  type="button"
                  onClick={() => handleDifficultyToggle(difficulty.value)}
                  className={`btn
              ${
                selectedDifficulties?.includes(difficulty.value)
                  ? 'btn-info'
                  : 'btn-base'
              }`}
                >
                  {difficulty.label}
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
            <legend className="fieldset-legend text-base">
              {ChallengeStrings.create.creator.label}
            </legend>
            <PlayerCard
              editable
              onChange={({ username }) => onUsernameChange(username)}
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
            {ChallengeStrings.create.submit}
          </button>
        </form>
      </ModalContainer.Content>
    </ModalContainer>
  )
}
