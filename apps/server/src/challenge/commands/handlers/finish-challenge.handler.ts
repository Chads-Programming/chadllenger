import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FinishChallengeCommand } from '../impl/finish-challenge.command';
import { ChallengeCacheRepository } from '../../repositories/challenge-cache.repository';
import { ChallengeStateBuilder } from '../../models/challenge-state.model';
import { ChadLogger } from '@/logger/chad-logger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHALLENGE_EVENTS } from '../../consts';
import { Status } from '@repo/schemas';

@CommandHandler(FinishChallengeCommand)
export class FinishChallengeHandler
  implements ICommandHandler<FinishChallengeCommand, ChallengeStateBuilder>
{
  constructor(
    private readonly challengeRepository: ChallengeCacheRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: ChadLogger,
  ) {}

  async execute(
    command: FinishChallengeCommand,
  ): Promise<ChallengeStateBuilder> {
    try {
      await this.challengeRepository.updateChallenge(command.codename, {
        status: Status.FINISHED,
      });

      const updatedChallenge = this.getByCodename(command.codename);

      this.eventEmitter.emit(
        CHALLENGE_EVENTS.CHALLENGE_FINISHED,
        updatedChallenge,
      );

      return updatedChallenge;
    } catch (error) {
      this.logger.error(
        error,
        null,
        'ChallengeConsumer::processFinishChallenge',
      );
      throw error;
    }
  }

  private getByCodename(codename: string) {
    return this.challengeRepository.findChallengeByCodename(codename);
  }
}
