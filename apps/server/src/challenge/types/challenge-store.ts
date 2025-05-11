import { IParticipant, IChallengeState, ChallengeType, IGeneratedQuizChallenge } from '@repo/schemas';

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

export type UpdateQuizzChallengeRequestType = Partial<
  Omit<IChallengeState, 'id' | 'createdAt' | 'updatedAt'>
> & {
  quiz: IGeneratedQuizChallenge;
};

export const JoinStatus = {
  ALREADY_JOINED: 'ALREADY_JOINED',
  JOINED: 'JOINED',
} as const;

export type JoinStatus = (typeof JoinStatus)[keyof typeof JoinStatus];

export type JoinChallengeRequestType = {
  type: ChallengeType;
  participantId: string;
  participantName: string;
  challengeCodename: string;
};

export type JoinChallengeResponseType = {
  participant: IParticipant;
  status: JoinStatus;
};
