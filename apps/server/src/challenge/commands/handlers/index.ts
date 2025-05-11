import { CreateClashChallengeHandler } from './create-clash-challenge.handler';
import { CreateQuizChallengeHandler } from './create-quiz-challenge.handler';
import { FinishChallengeHandler } from './finish-challenge.handler';
import { JoinChallengeHandler } from './join-challenge.handler';
import { StartChallengeHandler } from './start-challenge.handler';
import { UpdateOnlineCountHandler } from './update-online-count.handler';

export default [
  CreateClashChallengeHandler,
  FinishChallengeHandler,
  UpdateOnlineCountHandler,
  JoinChallengeHandler,
  CreateClashChallengeHandler,
  CreateQuizChallengeHandler,
  StartChallengeHandler,
];
