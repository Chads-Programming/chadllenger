import { GetChallengeQueryHandler } from './get-challenge-query.handler';
import { GetOnlineCountQueryHandler } from './get-online-count-query.handler';
import { GetPlayerChallengeQueryHandler } from './get-player-challenge-query.handler';
import { GetQuizChallengeQueryHandler } from './get-quiz-challenge-query.handler';

export default [
  GetChallengeQueryHandler,
  GetQuizChallengeQueryHandler,
  GetPlayerChallengeQueryHandler,
  GetOnlineCountQueryHandler,
];
