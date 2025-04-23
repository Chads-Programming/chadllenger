import { Global, Module } from '@nestjs/common';
import { ChadLogger } from './chad-logger';

@Global()
@Module({
  providers: [ChadLogger],
  exports: [ChadLogger],
})
export class LoggerModule {}
