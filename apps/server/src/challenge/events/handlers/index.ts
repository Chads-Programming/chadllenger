import { StartedChallengeEventHandler } from './started-challenge.handler';
import { CreatedQuizChallengeEventHandler } from './created-quiz-challenge.handler';
import { StartedQuestEventHandler } from './started-quest.handler';

export default [
  StartedChallengeEventHandler,
  CreatedQuizChallengeEventHandler,
  StartedQuestEventHandler,
];
