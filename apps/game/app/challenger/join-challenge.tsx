import { useForm } from 'react-hook-form'
import { type JoinChallengeRoom, joinChallengeRoomSchema } from '@repo/schemas'
import { useUser } from 'providers/user-provider'
import { Trophy } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalContainer } from 'components/modal/modal'
import ChallengeStrings from './strings/challenge'
import PlayerCard from './components/player-card'
import { useNavigate } from 'react-router'
import { useModalTrigger } from 'components/modal/modal-trigger'

export const JOIN_REF_MODAL_ID = 'join-challenge-modal'

export interface JoinChallengeProps {
  codename?: string
}

export const JoinChallenge = ({ codename }: JoinChallengeProps) => {
  const { username } = useUser()
  const navigate = useNavigate()

  const { closeModal } = useModalTrigger()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<JoinChallengeRoom>({
    defaultValues: {
      codename: codename || '',
      username: username || '',
    },
    resolver: zodResolver(joinChallengeRoomSchema),
  })

  const onSubmit = (data: JoinChallengeRoom) => {
    handleCreateChallenge(data)
  }

  const onUsernameChange = (username: string) => {
    setValue('username', username)
  }

  const handleCreateChallenge = (data: JoinChallengeRoom) => {
    navigate(`/challenge/${data.codename}`)
    closeModal(JOIN_REF_MODAL_ID)
  }

  return (
    <ModalContainer id={JOIN_REF_MODAL_ID}>
      <ModalContainer.Header>
        <header className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold dark:text-white text-secondary">
            {ChallengeStrings.join.title}
          </h1>
        </header>
      </ModalContainer.Header>
      <ModalContainer.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-base">
              {ChallengeStrings.join.codename.label}
            </legend>
            <input
              type="text"
              className="input w-full"
              disabled={Boolean(codename)}
              {...register('codename')}
              placeholder={ChallengeStrings.join.codename.placeholder}
            />
            {errors.codename && (
              <p className="mt-1 text-sm text-red-600">
                {errors.codename.message}
              </p>
            )}
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-base">
              {ChallengeStrings.join.username.label}
            </legend>
            <PlayerCard
              editable
              onChange={({ username }) => onUsernameChange(username)}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            className="w-full btn btn-primary py-2 px-4 text-lg font-semibold"
          >
            {ChallengeStrings.join.submit}
          </button>
        </form>
      </ModalContainer.Content>
    </ModalContainer>
  )
}
