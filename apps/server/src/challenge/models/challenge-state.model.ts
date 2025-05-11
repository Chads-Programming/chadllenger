import {
  ChallengeStatusType,
  ChallengeSummary,
  IParticipant,
  IChallengeState,
  IQuestChallenge,
  IQuestChallengeState,
  Status,
  ChallengeType,
} from '@repo/schemas';
import * as codeGenerator from '@/utils/code-generator';

import { ParticipantModel } from './participant.model';
import { Difficult } from '@repo/database';

const CODENAME_SIZE = 6;

export class ChallengeStateBuilder {
  id: string;
  title: string;
  codename: string;
  participants: IParticipant[];
  challenges: IQuestChallenge[];
  difficulties: Difficult[];
  currentChallenge: string;
  playedChallenges: IQuestChallengeState[];
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  status: ChallengeStatusType;
  expiration: number;
  type: ChallengeType;

  constructor() {
    this.id = '';
    this.title = '';
    this.codename = codeGenerator.generateCode(CODENAME_SIZE);
    this.participants = [];
    this.challenges = [];
    this.currentChallenge = '';
    this.playedChallenges = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.creator = '';
    this.status = Status.PENDING;
    this.expiration = 0;
    this.type = ChallengeType.Clash;
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

  setChallenges(codeChallenges: IQuestChallenge[]) {
    this.challenges = codeChallenges;
    return this;
  }

  setCurrentChallenge(currentChallenge: string) {
    this.currentChallenge = currentChallenge;
    return this;
  }

  setPlayedChallenges(playedChallenges: IQuestChallenge[]) {
    this.playedChallenges = playedChallenges;
    return this;
  }

  setType(type: ChallengeType) {
    this.type = type;
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

  addCodeChallenge(codeChallenge: IQuestChallenge) {
    this.challenges.push(codeChallenge);

    return this;
  }

  setDifficulties(difficulties: Difficult[]) {
    this.difficulties = difficulties;
    return this;
  }

  static fromProps(props: IChallengeState): ChallengeStateBuilder {
    const challengeState = new ChallengeStateBuilder();

    challengeState.id = props.id;
    challengeState.title = props.title;
    challengeState.codename = props.codename;
    challengeState.participants = props.participants;
    challengeState.challenges = props.challenges;
    challengeState.currentChallenge = props.currentChallenge;
    challengeState.playedChallenges = props.playedChallenges;
    challengeState.createdAt = props.createdAt;
    challengeState.updatedAt = props.updatedAt;
    challengeState.creator = props.creator;
    challengeState.status = props.status;
    challengeState.expiration = props.expiration;
    challengeState.type = props.type;
    challengeState.difficulties = props.difficulties;

    return challengeState;
  }

  getProps(): IChallengeState {
    return {
      id: this.id,
      title: this.title,
      codename: this.codename,
      participants: this.participants,
      challenges: this.challenges,
      currentChallenge: this.currentChallenge,
      playedChallenges: this.playedChallenges,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: this.creator,
      status: this.status,
      expiration: this.expiration,
      difficulties: this.difficulties,
      type: this.type,
    };
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      codename: this.codename,
      participants: this.participants,
      challenges: this.challenges,
      currentChallenge: this.currentChallenge,
      playedChallenges: this.playedChallenges,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: this.creator,
      status: this.status,
      expiration: this.expiration,
      type: this.type,
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
      type: this.type,
    };
  }
}
