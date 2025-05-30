export const CHALLENGE_QUEUE = {
  NAME: 'challenge',
  JOBS: {
    FINISH_CHALLENGE: 'finish-challenge',
    CREATE_CHALLENGE: 'create-challenge',
    START_CHALLENGE: 'start-challenge',
    START_NEXT_QUEST: 'start-next-quest',
    GENERATED_CHALLENGE: 'generated-challenge',
    SETUP_AUTO_QUEST: 'setup-auto-quest',
    FINISH_QUEST: 'finish-quest',
  },
};

export const AI_QUEUE = {
  NAME: 'ai',
  JOBS: {
    GENERATE_CHALLENGE: 'generate-challenge',
  },
};

export const AI_EVENTS = {
  CHALLENGE_GENERATED: 'challenge.generated',
};

export const CHALLENGE_EVENTS = {
  CHALLENGE_FINISHED: 'challenge.finished',
  QUEST_FINISHED: 'quest.finished',
  NEW_QUEST_STARTED: 'new.quest.started',
};
