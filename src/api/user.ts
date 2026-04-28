import http from '@/api/http'
import type { UserProfile } from '@/types/api'

export function getUserProfile() {
  return http.get<UserProfile>('/api/v1/user/me')
}
