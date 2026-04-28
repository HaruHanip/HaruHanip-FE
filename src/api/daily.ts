import http from '@/api/http'
import type { TodayDailyResponse, DailyResultResponse } from '@/types/api'

export function loadTodayDailyId(categoryId: number) {
  return http.get<TodayDailyResponse>(`/api/v1/daily/id/today/category/${categoryId}`)
}

export function loadDailyResult(dailyId: number) {
  return http.get<DailyResultResponse>(`/api/v1/problem/solve/result/${dailyId}`)
}
