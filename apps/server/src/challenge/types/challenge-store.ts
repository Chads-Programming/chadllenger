import { ChallengeStateModel } from '../models/challenge-state.model';

export type CreateChallengeRequestType = Omit<
  ChallengeStateModel,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'codename'
  | 'currentChallenge'
  | 'playedChallenges'
>;

export type UpdateChallengeRequestType = Omit<
  ChallengeStateModel,
  'id' | 'createdAt' | 'updatedAt'
>;
