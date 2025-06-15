import { ErrorCodeDetail, ErrorCodes } from '@/lib/errors';
import { ErrorHttpStatus } from '@/lib/http-error-map';
import { ChadLogger } from '@/logger/chad-logger';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch()
export class RestCustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ChadLogger) {}

  catch(exceptionCode: number, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    const statusCode =
      ErrorHttpStatus[exceptionCode] ||
      ErrorHttpStatus[ErrorCodes.DEFAULT_ERROR];

    const details =
      ErrorCodeDetail[exceptionCode] ||
      ErrorCodeDetail[ErrorCodes.DEFAULT_ERROR];

    this.logger.log(
      `Error filtered: ${exceptionCode}, Status Code: ${statusCode}`,
      'RestCustomExceptionFilter',
      { details },
    );

    res.status(statusCode).json({
      details,
      code: exceptionCode,
      timestamp: new Date().toISOString(),
    });
  }
}
