import axios from '@/lib/axios'

export function getUserProfile() {
  return axios.get(`/api/v1/user/me`);
}
