export interface Participant {
  id: string;
  name: string;
  points: number;
}

export const Status = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: ' FINISHED',
} as const;

type ChallengeStatus = (typeof Status)[keyof typeof Status];

interface CodeChallengeState {
  id: string;
  startedAt?: Date;
  winner?: string;
}

export interface ChallengeState {
  id: string;
  codename: string;
  participants: Participant[];
  codeChallenges: CodeChallengeState[];
  currentChallenge: string;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  status: ChallengeStatus;
  expiration: number;
}
