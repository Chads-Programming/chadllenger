export const Status = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: ' FINISHED',
} as const;

export type ChallengeStatus = (typeof Status)[keyof typeof Status];
