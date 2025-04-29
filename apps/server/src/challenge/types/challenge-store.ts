import { ParticipantModel } from './../models/participant.model';
import {
  ChallengeStateModel,
  ChallengeStateType,
} from '../models/challenge-state.model';

export type CreateChallengeRequestType = Omit<
  ChallengeStateType,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'codename'
  | 'currentChallenge'
  | 'playedChallenges'
>;

export type UpdateChallengeRequestType = Partial<
  Omit<ChallengeStateModel, 'id' | 'createdAt' | 'updatedAt'>
>;

export const JoinStatus = {
  ALREADY_JOINED: 'ALREADY_JOINED',
  JOINED: 'JOINED',
} as const;

export type JoinStatus = (typeof JoinStatus)[keyof typeof JoinStatus];

export type JoinChallengeRequestType = {
  participantId: string;
  participantName: string;
  challengeCodename: string;
};

export type JoinChallengeResponseType = {
  participant: ParticipantModel;
  status: JoinStatus;
};
