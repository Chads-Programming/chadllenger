import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  index('home.tsx'),
  layout('./challenger/layout.tsx', [
    route('challenge', './challenger/lobby-page.tsx'),
    route('challenge/:codename', './challenger/challenge-page.tsx'),
  ]),
] satisfies RouteConfig
