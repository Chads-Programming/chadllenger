import {
  Status,
  type IChallengeStateWithCurrentQuest,
  type IParticipant,
  type IQuestHistory,
  type IQuestQuizChallenge,
  type IQuizChallengeState,
} from '@repo/schemas'

export const ACTIONS = {
  STARTING_CHALLENGE: 'STARTING_CHALLENGE',
  LOAD_INITIAL_STATE: 'LOAD_INITIAL_STATE',
  JOIN_PLAYER: 'JOIN_PLAYER',
  STARTED_ROUND: 'STARTED_ROUND',
  MARK_QUEST_ANSWERED: 'MARK_QUEST_ANSWERED',
  FINISH_QUEST: 'FINISH_QUEST',
}

type ChallengeActionType = (typeof ACTIONS)[keyof typeof ACTIONS]

export type Action<TPayload = unknown> = {
  payload: TPayload
  type: ChallengeActionType
}

export type ActionHandler = <TPayload>(
  state: IQuizChallengeState,
  action: Action<TPayload>,
) => IQuizChallengeState

export const INITIAL_STATE: IQuizChallengeState = {
  id: '',
  title: '',
  codename: '',
  participants: [],
  challenges: [],
  currentChallenge: '',
  playedChallenges: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  creator: '',
  status: 'PENDING',
  expiration: 0,
  difficulties: [],
  participantsQuestHistory: {},
  type: 'Quiz',
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
  state: IQuizChallengeState,
  action: Action<TPayload>,
) => {
  const actionManager = {
    [ACTIONS.LOAD_INITIAL_STATE]: loadInitialState,
    [ACTIONS.JOIN_PLAYER]: joinParticipant,
    [ACTIONS.STARTED_ROUND]: startedRound,
    [ACTIONS.MARK_QUEST_ANSWERED]: markQuestAnswered,
    [ACTIONS.FINISH_QUEST]: finishQuest,
    [ACTIONS.STARTING_CHALLENGE]: startChallenge,
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
  _: IQuizChallengeState,
  action: Action<IQuizChallengeState>,
) => {
  console.log(action.payload)
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
  state: IQuizChallengeState,
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

/**
 * Updates the state when a new round has started in the challenge.
 *
 * This function takes the current state and an action containing the updated challenge state.
 * It returns a new state object that preserves all existing state properties but updates
 * the currentChallenge property with the one from the action payload.
 *
 * @param state - The current state of the quiz challenge
 * @param action - An action containing the updated challenge state
 * @returns A new state object with the updated currentChallenge
 */
const startedRound = (
  state: IQuizChallengeState,
  action: Action<IChallengeStateWithCurrentQuest>,
): IQuizChallengeState => {
  return {
    ...state,
    status: action.payload.status,
    challenges: [
      ...state.challenges,
      action.payload.currentQuest as IQuestQuizChallenge,
    ],
    playedChallenges: action.payload.playedChallenges,
    startedAt: action.payload.startedAt,
    currentChallenge: action.payload.currentChallenge,
  }
}

/**
 * Updates the state to mark a quest as answered by a participant.
 *
 * This function takes the current state and an action containing the quest history details.
 * It updates the participantsQuestHistory by either adding a new entry or updating an existing one
 * for the given participant and question.
 *
 * @param state - The current state of the quiz challenge
 * @param action - An action containing the quest history details (participant answer, score etc)
 * @returns A new state object with the updated participantsQuestHistory
 */
const markQuestAnswered = (
  state: IQuizChallengeState,
  action: Action<IQuestHistory>,
) => {
  const payload = action.payload
  const updatedState = structuredClone(state)
  const participantQuestHistory =
    updatedState.participantsQuestHistory[payload.questionId] || []

  const questHistory = {
    participantId: payload.participantId,
    participantAnswer: payload.participantAnswer,
    questionId: payload.questionId,
    score: payload.score,
    createdAt: payload.createdAt,
  }

  const participantQuestIndex = participantQuestHistory.findIndex(
    (quest) => quest.participantId === payload.participantId,
  )

  if (participantQuestIndex === -1) {
    participantQuestHistory.push(questHistory)
  } else {
    participantQuestHistory[participantQuestIndex] = questHistory
  }

  updatedState.participantsQuestHistory[payload.questionId] =
    participantQuestHistory

  return {
    ...state,
    participantsQuestHistory: updatedState.participantsQuestHistory,
  }
}

/**
 * Updates the state when a quest is finished.
 *
 * This function takes the current state and an action containing the updated participantsQuestHistory.
 * It updates the state with the new history and changes the status to indicate waiting for next quest.
 *
 * @param state - The current state of the quiz challenge
 * @param action - An action containing the updated participantsQuestHistory
 * @returns A new state object with updated history and status
 */
const finishQuest = (
  state: IQuizChallengeState,
  action: Action<IQuizChallengeState['participantsQuestHistory']>,
) => {
  return {
    ...state,
    participantsQuestHistory: action.payload,
    status: Status.AWAITING_NEXT_QUEST,
  }
}

/**
 * Handles the logic to start a quiz challenge.
 *
 * Updates the quiz challenge state to indicate that the challenge is starting,
 * and sets the `startedAt` timestamp from the provided action payload.
 *
 * @param state - The current state of the quiz challenge.
 * @param action - The action containing the payload with the challenge state and the current quest.
 * @returns A new state object with updated status and startedAt properties.
 */
const startChallenge = (
  state: IQuizChallengeState,
  action: Action<IChallengeStateWithCurrentQuest>,
) => {
  return {
    ...state,
    status: Status.STARTING,
    challenges: [],
    startedAt: action.payload.startedAt,
  }
}
