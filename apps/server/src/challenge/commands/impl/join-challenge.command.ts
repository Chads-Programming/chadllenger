import { Command } from '@nestjs/cqrs';
import {
  JoinChallengeRequestType,
  JoinChallengeResponseType,
} from '@/challenge/types/challenge-store';

export class JoinChallengeCommand extends Command<JoinChallengeResponseType> {
  constructor(public readonly joinRequest: JoinChallengeRequestType) {
    super();
  }
}
