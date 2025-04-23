import { CustomError } from '@/core/errors/custom-error';
import { ChadLogger } from '@/logger/chad-logger';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WsCustomExceptionFilter extends BaseWsExceptionFilter {
  constructor(private readonly logger: ChadLogger) {
    super();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    const isCustomError = exception instanceof CustomError;

    if (!isCustomError) {
      client.emit('error', {
        type: 'DEFAULT_ERROR',
        message: 'An error occurred',
      });

      this.logger.error(
        CustomError.serverError({
          origin: 'WsCustomExceptionFilter',
          message: 'An error occurred',
          data: exception,
        }),
        undefined,
        'WsCustomExceptionFilter',
      );

      return;
    }

    const { type, origin, message } = exception.context;

    const errorResponse = {
      type,
      message,
    };

    this.logger.error(exception, undefined, origin);

    client.emit('error', errorResponse);
  }
}
