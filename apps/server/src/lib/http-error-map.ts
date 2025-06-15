import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './errors';

export const ErrorHttpStatus: Record<
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  number
> = {
  [ErrorCodes.CHALLENGE_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCodes.CHALLENGE_IS_NOT_PENDING]: HttpStatus.BAD_REQUEST,
  [ErrorCodes.EXPIRED_CHALLENGE]: HttpStatus.FORBIDDEN,
  [ErrorCodes.EXPIRED_QUEST]: HttpStatus.FORBIDDEN,
  [ErrorCodes.DEFAULT_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ErrorCodes.QUEST_IS_NOT_STARTING]: HttpStatus.BAD_REQUEST,
  [ErrorCodes.QUEST_IS_NOT_PENDING]: HttpStatus.BAD_REQUEST,
};
