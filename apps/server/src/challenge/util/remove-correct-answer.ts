import { QuizChallengeStateBuilder } from '../models/challenge-state.model';

export function removeCorrectAnswer(challenge: QuizChallengeStateBuilder) {
  const quizWithoutAnswers = challenge.challenges.map((challenge) => {
    return {
      ...challenge,
      question: {
        ...challenge.question,
        options: challenge.question.options.map((option) => {
          const { isCorrectAnswer, ...rest } = option;
          return rest;
        }),
      },
    };
  });

  const challengeWithoutAnswers = {
    ...challenge,
    challenges: quizWithoutAnswers,
  };
  return challengeWithoutAnswers;
}

export function removeCorrectAnswerFromUnplayed(
  challenge: QuizChallengeStateBuilder,
) {
  const quizWithOnlyPlayedAnswers = challenge.challenges.map(
    (challengeItem) => {
      const hasBeenPlayed = challenge.playedChallenges.some(
        (playedChallenge) =>
          playedChallenge.questionId === challengeItem.id &&
          Boolean(playedChallenge.finishedAt),
      );

      return {
        ...challengeItem,
        question: {
          ...challengeItem.question,
          options: challengeItem.question.options.map((option) => {
            const { isCorrectAnswer, ...rest } = option;
            if (hasBeenPlayed) {
              return option;
            }
            return rest;
          }),
        },
      };
    },
  );

  const challengeWithoutAnswers = {
    ...challenge,
    challenges: quizWithOnlyPlayedAnswers,
  };
  return challengeWithoutAnswers;
}
