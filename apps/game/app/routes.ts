import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('home.tsx'),
  route('challenge', './challenger/lobby-page.tsx'),
  route('challenge/:challengeId', './challenger/challenge-page.tsx'),
] satisfies RouteConfig
