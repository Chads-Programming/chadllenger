import { AnswerQuestQuizHandler } from './answer-quest-quiz.handler';
import { ConfirmStartChallengeHandler } from './confirm-start-challenge.handler';
import { CreateClashChallengeHandler } from './create-clash-challenge.handler';
import { CreateQuizChallengeHandler } from './create-quiz-challenge.handler';
import { FinishChallengeHandler } from './finish-challenge.handler';
import { FinishQuestHandler } from './finish-quest.handler';
import { JoinChallengeHandler } from './join-challenge.handler';
import { StartChallengeHandler } from './start-challenge.handler';
import { StartNextQuestHandler } from './start-next-quest.handler';
import { UpdateOnlineCountHandler } from './update-online-count.handler';
import { UpdateQuizzChallengeHandler } from './update-quizz-challenge.handler';

export default [
  CreateClashChallengeHandler,
  FinishChallengeHandler,
  UpdateOnlineCountHandler,
  JoinChallengeHandler,
  CreateClashChallengeHandler,
  CreateQuizChallengeHandler,
  StartChallengeHandler,
  ConfirmStartChallengeHandler,
  CreateQuizChallengeHandler,
  CreateClashChallengeHandler,
  AnswerQuestQuizHandler,
  UpdateQuizzChallengeHandler,
  StartNextQuestHandler,
  FinishQuestHandler,
];
