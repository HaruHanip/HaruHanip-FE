export interface UserProfile {
  userId: number
  userName: string
  jobClassCode: string
}

export interface Category {
  categoryId: number
  name: string
}

export interface TodayDailyResponse {
  dailyId: number
}

export interface DailyResultResponse {
  score: number
}

export interface ProblemOption {
  option_index: number
  content: string
}

export interface Problem {
  problemId: number
  title: string
  options: ProblemOption[]
}

export interface NextQuestionResponse {
  dailyProblemId: number
  sequence: number
  problem: Problem
  code?: string
}

export interface SubmitAnswerRequest {
  dailyProblemId: number
  selectedOptionIndex: number
}

export interface SubmitAnswerResponse {
  isCorrect: boolean
  correctOption: number
  explanation: string
}
