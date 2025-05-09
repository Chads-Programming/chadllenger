import type { IChallengeState, IParticipant } from '@repo/schemas'

export const ACTIONS = {
  LOAD_INITIAL_STATE: 'LOAD_INITIAL_STATE',
  JOIN_PLAYER: 'JOIN_PLAYER',
}

type ChallengeActionType = (typeof ACTIONS)[keyof typeof ACTIONS]

export type Action<TPayload = unknown> = {
  payload: TPayload
  type: ChallengeActionType
}

export type ActionHandler = <TPayload>(
  state: IChallengeState,
  action: Action<TPayload>,
) => IChallengeState

export const INITIAL_STATE: IChallengeState = {
  id: '',
  title: '',
  codename: '',
  participants: [],
  codeChallenges: [],
  currentChallenge: '',
  playedChallenges: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  creator: '',
  status: 'PENDING',
  expiration: 0,
}

/**
 * The reducer function for managing the state of a challenge.
 *
 * This function takes the current state and an action, and returns a new state
 * based on the action type. It supports loading the initial state and joining a
 * participant to the challenge.
 *
 * @param state - The current state of the challenge.
 * @param action - The action to be processed.
 * @returns The updated state of the challenge.
 */
export const reducer = <TPayload>(
  state: IChallengeState,
  action: Action<TPayload>,
) => {
  const actionManager = {
    [ACTIONS.LOAD_INITIAL_STATE]: loadInitialState,
    [ACTIONS.JOIN_PLAYER]: joinParticipant,
  }

  const actionHandler = actionManager[action.type] as ActionHandler

  if (!actionHandler) {
    return state
  }

  return actionHandler(state, action as Parameters<typeof actionHandler>[1])
}

/**
 * Merges the initial state of the challenge with the payload from the provided action.
 *
 * @param state - The current state of the challenge.
 * @param action - An action containing a payload with the initial state to be merged.
 * @returns A new state object that combines the action payload and the current state.
 */
const loadInitialState = (
  _: IChallengeState,
  action: Action<IChallengeState>,
) => {
  return {
    ...action.payload,
  }
}

/**
 * Handles the addition of a participant to the challenge state.
 *
 * This function creates a cloned version of the current state and checks if the
 * participant provided in the action payload already exists in the participants list.
 * If the participant does not exist, it adds the participant to the list and returns
 * the updated state. If the participant already exists, it returns the cloned state
 * without modifications.
 *
 * @param state - The current state of the challenge.
 * @param action - The action containing the participant to be added.
 * @returns The updated state with the new participant added, or the original state
 *          if the participant already exists.
 */
const joinParticipant = (
  state: IChallengeState,
  action: Action<IParticipant>,
) => {
  const updatedState = structuredClone(state)
  const partipant = action.payload
  const participantAlreadyExists = updatedState.participants.find(
    (participant) => participant.id === partipant.id,
  )
  if (participantAlreadyExists) {
    return updatedState
  }

  updatedState.participants.push(partipant)

  return updatedState
}
