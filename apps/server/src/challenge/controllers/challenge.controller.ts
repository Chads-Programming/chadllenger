import { Controller, Get, Param } from '@nestjs/common';
import { ChallengeService } from '../services/challenge.service';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get('code/:codename')
  getOnlineTotalOnline(@Param('codename') codename: string) {
    return this.challengeService.getByCodename(codename);
  }
}
