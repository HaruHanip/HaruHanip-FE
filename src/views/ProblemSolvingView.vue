<template>
  <div class="main-screen">
    <Header
      :isLoggedIn="isLoggedIn"
      @login-clicked="handleLogin"
      @logout-clicked="handleLogout"
    />
    <main class="content-area">
      <div class="problem-solving">
        <!-- 1) 카테고리 고르면 첫 문제 로드 -->
        <CategorySelect
          v-if="!selectedCategory"
          :categories="categories"
          @select="selectCategory"
        />

        <!-- 2) 문제 풀기 화면 -->
        <QuestionView
          v-else-if="!showResult && currentQuestion"
          :question="currentQuestion"
          :index="currentIndex"
          :total="total"
          @submit="handleSubmit"
        />

        <!-- 3) 결과 보기 -->
        <ResultView
          v-else-if="showResult"
          :isCorrect="isCorrect"
          :correct="correctAnswer"
          :explanation="explanation"
          @next="nextQuestion"
        />

        <!-- 4) 모두 끝나면 요약 -->
        <SummaryView
          v-else
          :correctCount="correctCount"
          :total="total"
          @restart="restart"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../api/axiosInstance'
import Header             from '../components/AppHeader.vue'
import CategorySelect     from '../components/ProblemCategorySelect.vue'
import QuestionView       from '../components/QuestionView.vue'
import ResultView         from '../components/ResultView.vue'
import SummaryView        from '../components/SummaryView.vue'

const isLoggedIn      = ref(false)
const categories      = ['자료구조','알고리즘','네트워크','OS','DB']
const selectedCategory= ref('')
const currentQuestion = ref(null)
const currentIndex    = ref(0)
const total           = ref(0)
const correctCount    = ref(0)
const showResult      = ref(false)
const isCorrect       = ref(false)
const correctAnswer   = ref('')
const explanation     = ref('')

function handleLogin()  { isLoggedIn.value = true }
function handleLogout() { isLoggedIn.value = false }

// 1) 카테고리 선택 → 1번 문제 로드
function selectCategory(cat) {
  selectedCategory.value = cat
  currentIndex.value = 1
  loadQuestion(currentIndex.value)
}

// 서버에서 한 문제만 가져오기
async function loadQuestion(idx) {
  try {
    const res = await axios.get('/api/questions/next', {
      params: { category: selectedCategory.value, index: idx }
    })
    // 서버 응답: { question: { id,text,options,answer,explanation }, totalProblems: number }
    currentQuestion.value = res.data.question
    total.value           = res.data.totalProblems
    showResult.value      = false
  } catch (e) {
    console.error('문제 로드 실패', e)
  }
}

// 2) 사용자가 선택지를 클릭하면
async function handleSubmit(answer) {
  try {
    const res = await axios.post(
      `/api/questions/${currentQuestion.value.id}/answer`,
      { answer }
    )
    // 서버 응답: { isCorrect, correctAnswer, explanation }
    isCorrect.value     = res.data.isCorrect
    correctAnswer.value = res.data.correctAnswer
    explanation.value   = res.data.explanation
    if (isCorrect.value) correctCount.value++
    showResult.value    = true
  } catch (e) {
    console.error('정답 제출 실패', e)
  }
}

// 3) 다음 문제로
function nextQuestion() {
  if (currentIndex.value < total.value) {
    currentIndex.value++
    loadQuestion(currentIndex.value)
  } else {
    // 모두 끝
    currentQuestion.value = null
  }
}

// 4) 처음으로 돌아가기
function restart() {
  selectedCategory.value = ''
  currentIndex.value     = 0
  correctCount.value     = 0
  showResult.value       = false
}
</script>

<style scoped>
/* (기존 스타일 그대로) */
</style>
