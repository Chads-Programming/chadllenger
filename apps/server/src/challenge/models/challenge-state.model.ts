import { ChallengeSummary } from '@repo/schemas';
import { ChallengeStatus } from '../types/challenge-state';
import { CodeChallengeStateModel } from './code-challenge.model';
import { ParticipantModel } from './participant.model';

export interface ChallengeStateType {
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

  static fromJson(props: ChallengeStateType): ChallengeStateModel {
    const challengeState = new ChallengeStateModel();

    challengeState.id = props.id;
    challengeState.title = props.title;
    challengeState.codename = props.codename;
    challengeState.participants = props.participants;
    challengeState.codeChallenges = props.codeChallenges;
    challengeState.currentChallenge = props.currentChallenge;
    challengeState.playedChallenges = props.playedChallenges;
    challengeState.createdAt = props.createdAt;
    challengeState.updatedAt = props.updatedAt;
    challengeState.creator = props.creator;
    challengeState.status = props.status;
    challengeState.expiration = props.expiration;

    return challengeState;
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      codename: this.codename,
      participants: this.participants,
      codeChallenges: this.codeChallenges,
      currentChallenge: this.currentChallenge,
      playedChallenges: this.playedChallenges,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: this.creator,
      status: this.status,
      expiration: this.expiration,
    });
  }

  toSummary(): ChallengeSummary {
    const leaderboard = this.participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      score: participant.score,
    }));

    return {
      id: this.id,
      codename: this.codename,
      leaderboard,
    };
  }
}
