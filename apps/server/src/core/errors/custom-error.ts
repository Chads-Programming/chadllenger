export enum ErrorType {
  NotAuthorized = 'NOT_AUTHORIZED',
  BadArguments = 'BAD_ARGUMENTS',
  ServerError = 'SERVER_ERROR',
  NotFound = 'NOT_FOUND',
}

interface ErrorContext {
  type: ErrorType;
  origin: string;
  message: string;
  code: number | string;
  data?: unknown;
}

type ErrorPayload = Omit<ErrorContext, 'type'>;

export class CustomError extends Error {
  protected constructor(private readonly errorContext: ErrorContext) {
    super(JSON.stringify(errorContext, null, 3));
  }

  static notAuthorized(payload: ErrorPayload) {
    return new CustomError({
      ...payload,
      type: ErrorType.NotAuthorized,
    });
  }

  static badArguments(payload: ErrorPayload) {
    return new CustomError({
      ...payload,
      type: ErrorType.BadArguments,
    });
  }

  static serverError(payload: ErrorPayload) {
    return new CustomError({
      ...payload,
      type: ErrorType.ServerError,
    });
  }

  static notFound(payload: ErrorPayload) {
    return new CustomError({
      ...payload,
      type: ErrorType.NotFound,
    });
  }

  get context() {
    return this.errorContext;
  }
}
