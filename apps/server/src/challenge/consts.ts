export const CHALLENGE_QUEUE = {
  NAME: 'challenge',
  JOBS: {
    FINISH_CHALLENGE: 'finish-challenge',
    CREATE_CHALLENGE: 'create-challenge',
    START_CHALLENGE: 'start-challenge',
    GENERATED_CHALLENGE: 'generated-challenge',
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
};
