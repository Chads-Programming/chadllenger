import { IParticipant, IChallengeState } from '@repo/schemas';

export type CreateChallengeRequestType = Omit<
  IChallengeState,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'codename'
  | 'currentChallenge'
  | 'playedChallenges'
>;

export type UpdateChallengeRequestType = Partial<
  Omit<IChallengeState, 'id' | 'createdAt' | 'updatedAt'>
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
  participant: IParticipant;
  status: JoinStatus;
};
