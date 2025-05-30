import {
  ChallengeStatusType,
  ChallengeSummary,
  IParticipant,
  IChallengeState,
  IQuestChallenge,
  IQuestChallengeState,
  Status,
  ChallengeType,
  IQuestQuizChallenge,
  IQuestHistory,
  IChallengeStateWithCurrentQuest,
} from '@repo/schemas';
import * as codeGenerator from '@/utils/code-generator';

import { ParticipantModel } from './participant.model';
import { Difficult } from '@repo/database';
import { RegisterAnswerRequestType } from '../types/challenge-store';

const CODENAME_SIZE = 6;
const QUEST_DELTA_SCORE = 1000;

export class ChallengeStateBuilder<
  QuestChallenge extends IQuestChallenge = IQuestChallenge,
  QuestChallengeState extends IQuestChallengeState = IQuestChallengeState,
> {
  id: string;
  title: string;
  codename: string;
  participants: IParticipant[];
  challenges: QuestChallenge[];
  difficulties: Difficult[];
  currentChallenge: string;
  playedChallenges: QuestChallengeState[];
  startedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  status: ChallengeStatusType;
  expiration: number;
  type: ChallengeType;
  participantsQuestHistory: Record<string, IQuestHistory[]>;

  constructor() {
    this.id = '';
    this.title = '';
    this.codename = codeGenerator.generateCode(CODENAME_SIZE);
    this.participants = [];
    this.challenges = [];
    this.currentChallenge = '';
    this.playedChallenges = [];
    this.participantsQuestHistory = {};
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

  markAsStarted() {
    this.startedAt = new Date();
    this.status = Status.IN_PROGRESS;
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

  setChallenges(codeChallenges: QuestChallenge[]) {
    this.challenges = codeChallenges;
    return this;
  }

  isLastQuest() {
    if (this.playedChallenges.length === this.challenges.length) {
      return true;
    }

    return false;
  }

  private setCurrentChallenge(currentChallenge: string) {
    this.currentChallenge = currentChallenge;

    const newQuestState: IQuestChallengeState = {
      questionId: currentChallenge,
      startedAt: new Date(),
    };

    this.playedChallenges.push(newQuestState as QuestChallengeState);

    return this;
  }

  nextChallenge() {
    if (!this.currentChallenge) {
      const firstChallenge = [...this.challenges].shift();

      this.setCurrentChallenge(firstChallenge.id);

      return this;
    }

    const currentChallengeIndex = this.challenges.findIndex(
      (challenge) => challenge.id === this.currentChallenge,
    );
    const nextChallenge = this.challenges[currentChallengeIndex + 1];

    if (!nextChallenge) {
      return this;
    }

    this.setCurrentChallenge(nextChallenge.id);

    return this;
  }

  getCurrentQuest() {
    return this.challenges.find(
      (challenge) => challenge.id === this.currentChallenge,
    );
  }

  finishCurrentQuest() {
    const currentChallengeIndex = this.playedChallenges.findIndex(
      (challenge) => challenge.questionId === this.currentChallenge,
    );
    const currentChallenge = this.playedChallenges[currentChallengeIndex];

    const questHistory =
      this.participantsQuestHistory[currentChallenge.questionId];

    if (questHistory) {
      const [bestHistory] = questHistory.sort((aHistory, bHistory) => {
        return bHistory.score - aHistory.score;
      });

      currentChallenge.winner = bestHistory.participantId;
    }

    this.playedChallenges[currentChallengeIndex] = currentChallenge;
    this.status = Status.AWAITING_NEXT_QUEST;

    return this;
  }

  setPlayedChallenges(playedChallenges: QuestChallengeState[]) {
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

  addCodeChallenge(codeChallenge: QuestChallenge) {
    this.challenges.push(codeChallenge);

    return this;
  }

  setDifficulties(difficulties: Difficult[]) {
    this.difficulties = difficulties;
    return this;
  }

  updateParticipant(participant: ParticipantModel) {
    const index = this.participants.findIndex((p) => p.id === participant.id);
    if (index !== -1) {
      this.participants[index] = participant;
    }
    return this;
  }

  findParticipant(participantId: string) {
    return this.participants.find((p) => p.id === participantId);
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
    challengeState.startedAt = props.startedAt;

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
      participantsQuestHistory: this.participantsQuestHistory,
    };
  }

  registryParticipantAnswer(particpantAnswer: RegisterAnswerRequestType) {
    const currentHistory =
      this.participantsQuestHistory[particpantAnswer.questionId] || [];

    const questionStartTime = this.playedChallenges.find(
      (challenge) => challenge.questionId === particpantAnswer.questionId,
    )?.startedAt;

    const currentTime = new Date();

    const diffTimes = currentTime.getTime() - questionStartTime.getTime();
    const score = Math.floor(
      (diffTimes + QUEST_DELTA_SCORE) / QUEST_DELTA_SCORE,
    );

    const newHistory: IQuestHistory = {
      questionId: particpantAnswer.questionId,
      participantId: particpantAnswer.participantId,
      participantAnswer: particpantAnswer.answer,
      score,
      createdAt: new Date(),
    };
    currentHistory.push(newHistory);

    const currentParticipant = this.participants.find(
      (participant) => participant.id === particpantAnswer.participantId,
    );

    currentParticipant.score += score;

    this.updateParticipant(currentParticipant);

    return this;
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
      participantsQuestHistory: this.participantsQuestHistory,
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

  withOnlyCurrentQuest(): IChallengeStateWithCurrentQuest {
    const challenge = this.getProps();
    Reflect.deleteProperty(challenge, 'challenges');

    return {
      ...challenge,
      currentQuest: this.getCurrentQuest(),
    };
  }
}

export type QuizChallengeStateBuilder =
  ChallengeStateBuilder<IQuestQuizChallenge>;
