import { CustomError } from '@/core/errors/custom-error';
import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class ChadLogger implements LoggerService {
  log(message: unknown, context?: string, data?: unknown) {
    this.print('LOG', message, context, null, data);
  }

  error(message: unknown, trace?: string, context?: string, data?: unknown) {
    this.print('ERROR', message, context, trace, data);
  }

  warn(message: unknown, context?: string, data?: unknown) {
    this.print('WARN', message, context, null, data);
  }

  debug(message: unknown, context?: string, data?: unknown) {
    this.print('DEBUG', message, context, null, data);
  }

  private print(
    level: 'LOG' | 'ERROR' | 'WARN' | 'DEBUG',
    message: unknown,
    context?: string,
    trace?: string,
    data?: unknown,
  ) {
    const time = new Date().toISOString();

    const formattedMessage =
      message instanceof CustomError
        ? {
            level,
            time,
            context: context ?? message.context.origin,
            errorType: message.context.type,
            errorMessage: message.context.message,
            data: message.context.data,
            trace,
          }
        : {
            level,
            time,
            context,
            message,
            trace,
            data,
          };

    console.log(JSON.stringify(formattedMessage, null, 0));
  }
}
