import axios from 'axios'
import { useUserStore } from '@/stores/useUserStore'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

http.interceptors.request.use(config => {
  if (config.url?.endsWith('/auth/refresh')) {
    delete config.headers['Authorization']
    return config
  }

  const userStore = useUserStore()
  const token = userStore.accessToken
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  failedQueue = []
}

http.interceptors.response.use(
  res => res,
  err => {
    const { config, response } = err

    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          config.headers['Authorization'] = `Bearer ${token}`
          return http(config)
        })
      }

      config._retry = true
      isRefreshing = true
      const userStore = useUserStore()

      return new Promise((resolve, reject) => {
        http.post<{ accessToken: string }>('/auth/refresh')
          .then(({ data }) => {
            userStore.setAccessToken(data.accessToken)
            processQueue(null, data.accessToken)
            config.headers['Authorization'] = `Bearer ${data.accessToken}`
            resolve(http(config))
          })
          .catch(refreshError => {
            processQueue(refreshError, null)
            userStore.logout()
            reject(refreshError)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(err)
  }
)

export default http
