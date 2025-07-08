import axios from '../lib/axios'

export function loadNextQuestion(dailyId) {
  return axios
    .get(`/api/v1/daily-problem/daily/${dailyId}/solving`)
}

export function submitAnswer(answer) {
  return axios
    .post(`/api/v1/problem/solve`, answer);
}