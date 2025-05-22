import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'
import { ChallengeType } from '@repo/schemas'

export default [
  index('home.tsx'),
  layout('./challenger/layout.tsx', [
    route('challenge', './challenger/lobby/lobby-page.tsx'),
    route(
      `challenge/${ChallengeType.Clash}/:codename`,
      './challenger/challenge/clash/clash.page.tsx',
    ),
    layout('./challenger/challenge/quiz/quiz.layout.tsx', [
      route(
        `challenge/${ChallengeType.Quiz}/:codename`,
        './challenger/challenge/quiz/quiz.page.tsx',
      ),
    ]),
    route('challenge/not-found', './challenger/challenge/not-found.page.tsx'),
  ]),
] satisfies RouteConfig
