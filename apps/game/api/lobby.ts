import http from 'lib/http'

const VITE_API_URL = import.meta.env.VITE_API_URL

const lobbyApi = http.create({
  baseURL: `${VITE_API_URL}/lobby`,
})

const getOnlineTotalOnline = async () => {
  const abortController = new AbortController()

  const { data } = await lobbyApi.get<number>('/online', {
    controller: abortController,
  })

  return data
}

export default { getOnlineTotalOnline }
