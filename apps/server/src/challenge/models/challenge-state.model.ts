import { ChallengeStatus } from '../types/challenge-state';
import { CodeChallengeStateModel } from './code-challenge.model';
import { ParticipantModel } from './participant.model';

export class ChallengeStateModel {
  id: string;
  title: string;
  codename: string;
  participants: ParticipantModel[];
  codeChallenges: CodeChallengeStateModel[];
  currentChallenge: string;
  playedChallenges: CodeChallengeStateModel[];
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  status: ChallengeStatus;
  expiration: number;
}
