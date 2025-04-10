import { ChallengeState } from './challenge-state';

export type CreateChallengeStore = Omit<
  ChallengeState,
  'id' | 'createdAt' | 'updatedAt' | 'codename'
>;

export type UpdateChallengeStore = CreateChallengeStore;
