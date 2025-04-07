import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { REPOSITORIES } from './const'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, ...REPOSITORIES],
  exports: [PrismaService, ...REPOSITORIES],
})
export class DatabaseModule {}
