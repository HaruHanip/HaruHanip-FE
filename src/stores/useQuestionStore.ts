import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCategories } from '@/api/category'
import { loadTodayDailyId, loadDailyResult } from '@/api/daily'
import { loadNextQuestion, submitAnswer } from '@/api/problem'
import type { Category, Problem } from '@/types/api'

const TOTAL_QUESTIONS = 10

export const useQuestionStore = defineStore('question', () => {
  const categories = ref<Category[]>([])
  const selectedCategoryId = ref<number | null>(null)
  const todayDailyId = ref<number | null>(null)

  const currentQuestion = ref<Problem | null>(null)
  const currentDailyProblemId = ref<number>(0)
  const currentIndex = ref<number>(0)
  const correctCount = ref<number>(0)

  const showResult = ref<boolean>(false)
  const isCorrect = ref<boolean>(false)
  const correctAnswer = ref<number | string>('')
  const explanation = ref<string>('')
  const quizFinished = ref<boolean>(false)

  async function fetchCategoriesAction() {
    categories.value = await fetchCategories()
  }

  async function selectCategory(categoryId: number) {
    selectedCategoryId.value = categoryId

    const res = await loadTodayDailyId(categoryId)
    todayDailyId.value = res.data.dailyId

    correctCount.value = 0
    quizFinished.value = false
    showResult.value = false

    await loadNextQuestionAction()
  }

  async function loadNextQuestionAction() {
    if (!todayDailyId.value) return

    const res = await loadNextQuestion(todayDailyId.value)

    if (res.data.code === 'NO_MORE_DAILY') {
      const { data: result } = await loadDailyResult(todayDailyId.value)
      correctCount.value = result.score
      quizFinished.value = true
    } else {
      const { dailyProblemId, sequence, problem } = res.data
      currentDailyProblemId.value = dailyProblemId
      currentIndex.value = sequence
      currentQuestion.value = problem
      showResult.value = false
    }
  }

  async function submitAnswerAction(selectedOptionIndex: number) {
    if (!currentQuestion.value) return

    const { data } = await submitAnswer({
      dailyProblemId: currentDailyProblemId.value,
      selectedOptionIndex,
    })

    isCorrect.value = data.isCorrect
    correctAnswer.value = data.correctOption
    explanation.value = data.explanation
    showResult.value = true
  }

  async function proceedToNext() {
    await loadNextQuestionAction()
  }

  function reset() {
    selectedCategoryId.value = null
    todayDailyId.value = null
    currentQuestion.value = null
    currentDailyProblemId.value = 0
    currentIndex.value = 0
    correctCount.value = 0
    showResult.value = false
    isCorrect.value = false
    correctAnswer.value = ''
    explanation.value = ''
    quizFinished.value = false
  }

  return {
    TOTAL_QUESTIONS,
    categories,
    selectedCategoryId,
    currentQuestion,
    currentIndex,
    correctCount,
    showResult,
    isCorrect,
    correctAnswer,
    explanation,
    quizFinished,
    fetchCategoriesAction,
    selectCategory,
    submitAnswerAction,
    proceedToNext,
    reset,
  }
})
