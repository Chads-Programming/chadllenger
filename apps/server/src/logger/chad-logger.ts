import { CustomError } from '@/core/errors/custom-error';
import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class ChadLogger implements LoggerService {
  log(message: unknown, context?: string) {
    this.print('LOG', message, context);
  }

  error(message: unknown, trace?: string, context?: string) {
    this.print('ERROR', message, context, trace);
  }

  warn(message: unknown, context?: string) {
    this.print('WARN', message, context);
  }

  debug(message: unknown, context?: string) {
    this.print('DEBUG', message, context);
  }

  private print(
    level: 'LOG' | 'ERROR' | 'WARN' | 'DEBUG',
    message: unknown,
    context?: string,
    trace?: string,
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
          };

    console.log(JSON.stringify(formattedMessage, null, 1));
  }
}
