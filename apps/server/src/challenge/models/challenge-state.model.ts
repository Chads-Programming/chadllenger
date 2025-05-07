import {
  ChallengeStatusType,
  ChallengeSummary,
  IChallengeState,
  ICodeChallenge,
  ICodeChallengeState,
  IParticipant,
  Status,
} from '@repo/schemas';
import * as codeGenerator from '@/utils/code-generator';

import { CodeChallengeStateModel } from './code-challenge.model';
import { ParticipantModel } from './participant.model';

const CODENAME_SIZE = 6;

export class ChallengeStateBuilder {
  id: string;
  title: string;
  codename: string;
  participants: IParticipant[];
  codeChallenges: ICodeChallenge[];
  currentChallenge: string;
  playedChallenges: ICodeChallengeState[];
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  status: ChallengeStatusType;
  expiration: number;

  constructor() {
    this.id = '';
    this.title = '';
    this.codename = codeGenerator.generateCode(CODENAME_SIZE);
    this.participants = [];
    this.codeChallenges = [];
    this.currentChallenge = '';
    this.playedChallenges = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.creator = '';
    this.status = Status.PENDING;
    this.expiration = 0;
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setCodename(codename: string) {
    this.codename = codename;
    return this;
  }

  setParticipants(participants: ParticipantModel[]) {
    this.participants = participants;
    return this;
  }

  setCodeChallenges(codeChallenges: ICodeChallenge[]) {
    this.codeChallenges = codeChallenges;
    return this;
  }

  setCurrentChallenge(currentChallenge: string) {
    this.currentChallenge = currentChallenge;
    return this;
  }

  setPlayedChallenges(playedChallenges: CodeChallengeStateModel[]) {
    this.playedChallenges = playedChallenges;
    return this;
  }

  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
    return this;
  }

  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
    return this;
  }

  setCreator(creator: string) {
    this.creator = creator;
    return this;
  }

  setExpiration(expiration: number) {
    this.expiration = expiration;
    return this;
  }

  setStatus(status: ChallengeStatusType) {
    this.status = status;

    return this;
  }

  addParticipant(participant: ParticipantModel) {
    this.participants.push(participant);

    return this;
  }

  addCodeChallenge(codeChallenge: ICodeChallenge) {
    this.codeChallenges.push(codeChallenge);

    return this;
  }

  static fromProps(props: IChallengeState): ChallengeStateBuilder {
    const challengeState = new ChallengeStateBuilder();

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

  getProps(): IChallengeState {
    return {
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
    };
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
