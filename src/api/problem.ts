import http from '@/api/http'
import type { NextQuestionResponse, SubmitAnswerRequest, SubmitAnswerResponse } from '@/types/api'

export function loadNextQuestion(dailyId: number) {
  return http.get<NextQuestionResponse>(`/api/v1/daily-problem/daily/${dailyId}/solving`)
}

export function submitAnswer(answer: SubmitAnswerRequest) {
  return http.post<SubmitAnswerResponse>('/api/v1/problem/solve', answer)
}
