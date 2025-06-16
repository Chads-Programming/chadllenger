interface ErrorDetail {
  type: keyof typeof ErrorCodes;
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

type ErrorCodesType = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export const ErrorCodeDetail: Record<ErrorCodesType, ErrorDetail> = {
  [ErrorCodes.CHALLENGE_NOT_FOUND]: {
    type: 'CHALLENGE_NOT_FOUND',
    description: 'The challenge with the specified codename was not found.',
  },
  [ErrorCodes.CHALLENGE_IS_NOT_PENDING]: {
    type: 'CHALLENGE_IS_NOT_PENDING',
    description: 'The challenge is not in a pending state.',
  },
  [ErrorCodes.EXPIRED_CHALLENGE]: {
    type: 'EXPIRED_CHALLENGE',
    description: 'The challenge has expired and can no longer be accessed.',
  },
  [ErrorCodes.EXPIRED_QUEST]: {
    type: 'EXPIRED_QUEST',
    description: 'The quest has expired and can no longer be accessed.',
  },
  [ErrorCodes.DEFAULT_ERROR]: {
    type: 'DEFAULT_ERROR',
    description: 'An unexpected error occurred.',
  },
  [ErrorCodes.QUEST_IS_NOT_STARTING]: {
    type: 'QUEST_IS_NOT_STARTING',
    description: 'The quest is not in a starting state.',
  },
  [ErrorCodes.QUEST_IS_NOT_PENDING]: {
    type: 'QUEST_IS_NOT_PENDING',
    description: 'The quest is not in a pending state.',
  },
};
