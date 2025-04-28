import {
  ChallengeStateModel,
  ChallengeStateType,
} from '../models/challenge-state.model';

export type CreateChallengeRequestType = Omit<
  ChallengeStateType,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'codename'
  | 'currentChallenge'
  | 'playedChallenges'
>;

export type UpdateChallengeRequestType = Partial<
  Omit<ChallengeStateModel, 'id' | 'createdAt' | 'updatedAt'>
>;
