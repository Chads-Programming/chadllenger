import type { IChallengeState } from '@repo/schemas'
import http from 'lib/http'

const VITE_API_URL = import.meta.env.VITE_API_URL

const challengeApi = http.create({
  baseURL: `${VITE_API_URL}/challenge`,
})

const getChallengeByCodename = async (codename: string) => {
  const abortController = new AbortController()

  const { data } = await challengeApi.get<IChallengeState>(
    `/code/${codename}`,
    {
      controller: abortController,
    },
  )

  return data
}

export default { getChallengeByCodename }
