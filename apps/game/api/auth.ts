import http from 'lib/http'

const VITE_API_URL = import.meta.env.VITE_API_URL

const authApi = http.create({
  baseURL: `${VITE_API_URL}/auth`,
})

const createSession = async () => {
  const { data } = await authApi.post<{ sessionId: string }>(
    '/create-session',
    {},
  )

  return data
}

export default { createSession }
