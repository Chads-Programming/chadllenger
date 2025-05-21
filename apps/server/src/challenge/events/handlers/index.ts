import { StartedChallengeEventHandler } from './started-challenge.handler';
import { CreatedQuizChallengeEventHandler } from './created-quiz-challenge.handler';
import { StartedQuestEventHandler } from './started-quest.handler';
import { FinishedQuestEventHandler } from './finished-quest.handler';

export default [
  StartedChallengeEventHandler,
  CreatedQuizChallengeEventHandler,
  StartedQuestEventHandler,
  FinishedQuestEventHandler,
];
