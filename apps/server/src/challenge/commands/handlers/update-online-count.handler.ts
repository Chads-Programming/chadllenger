import { LobbyCacheRepository } from './../../repositories/lobby-cache.repository';
import { UpdateOnlineCountCommand } from '../impl/update-online-count.command';
import { ChadLogger } from '@/logger/chad-logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateOnlineCountCommand)
export class UpdateOnlineCountHandler
  implements ICommandHandler<UpdateOnlineCountCommand, void>
{
  constructor(
    private readonly lobbyRepository: LobbyCacheRepository,
    private readonly logger: ChadLogger,
  ) {}

  async execute(command: UpdateOnlineCountCommand): Promise<void> {
    try {
      await this.lobbyRepository.setOnlineTotalOnline(command.onlineCount);
    } catch (error) {
      this.logger.error(error, null, 'UpdateOnlineCountHandler::execute');
      throw error;
    }
  }
}
