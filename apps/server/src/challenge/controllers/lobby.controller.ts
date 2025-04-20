import { Controller, Get } from '@nestjs/common';
import { LobbyService } from '../services/lobby.service';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get('online')
  getOnlineTotalOnline() {
    return this.lobbyService.getOnlineTotalOnline();
  }
}
