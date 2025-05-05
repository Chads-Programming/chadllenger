import { Command } from '@nestjs/cqrs';

export class UpdateOnlineCountCommand extends Command<void> {
  constructor(public readonly onlineCount: number) {
    super();
  }
}
