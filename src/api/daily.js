import axios from '../lib/axios'

export function loadTodayDailyId(categoryId) {
  return axios
    .get(`/api/v1/daily/id/today/category/${categoryId}`)
    .then(res => ({
      dailyId: res.data.dailyId
    }))
}

export function loadDailyResult(dailyId) {
  return axios
    .get(`/api/v1/problem/solve/result/${dailyId}`)
}