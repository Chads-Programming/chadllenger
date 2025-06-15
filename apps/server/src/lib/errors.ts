interface ErrorDetail {
  name: keyof typeof ErrorCodes;
  description: string;
}

export const ErrorCodes = {
  CHALLENGE_NOT_FOUND: 1000,
  CHALLENGE_IS_NOT_PENDING: 1001,
  EXPIRED_CHALLENGE: 1003,
  EXPIRED_QUEST: 1004,
  DEFAULT_ERROR: 1100,
  QUEST_IS_NOT_STARTING: 1101,
  QUEST_IS_NOT_PENDING: 1102,
} as const;

export const ErrorCodeDetail: Record<
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  ErrorDetail
> = {
  [ErrorCodes.CHALLENGE_NOT_FOUND]: {
    name: 'CHALLENGE_NOT_FOUND',
    description: 'The challenge with the specified codename was not found.',
  },
  [ErrorCodes.CHALLENGE_IS_NOT_PENDING]: {
    name: 'CHALLENGE_IS_NOT_PENDING',
    description: 'The challenge is not in a pending state.',
  },
  [ErrorCodes.EXPIRED_CHALLENGE]: {
    name: 'EXPIRED_CHALLENGE',
    description: 'The challenge has expired and can no longer be accessed.',
  },
  [ErrorCodes.EXPIRED_QUEST]: {
    name: 'EXPIRED_QUEST',
    description: 'The quest has expired and can no longer be accessed.',
  },
  [ErrorCodes.DEFAULT_ERROR]: {
    name: 'DEFAULT_ERROR',
    description: 'An unexpected error occurred.',
  },
  [ErrorCodes.QUEST_IS_NOT_STARTING]: {
    name: 'QUEST_IS_NOT_STARTING',
    description: 'The quest is not in a starting state.',
  },
  [ErrorCodes.QUEST_IS_NOT_PENDING]: {
    name: 'QUEST_IS_NOT_PENDING',
    description: 'The quest is not in a pending state.',
  },
};
