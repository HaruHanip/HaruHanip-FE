<template>
  <div class="main-screen">
    <Header
      :isLoggedIn="isLoggedIn"
      @login-clicked="handleLogin"
      @logout-clicked="handleLogout"
    />

    <main class="content-area">
      <div class="problem-solving">
        <!-- 1) 카테고리 선택 -->
        <div v-if="!selectedCategory" key="category">
          <CategorySelect
            :categories="categories"
            @select="selectCategory"
          />
        </div>

        <!-- 2) 문제 풀이 -->
        <div
          v-else-if="!quizFinished && !showResult && currentQuestion"
          :key="`question-${currentIndex}`"
        >
          <QuestionView
            :question="currentQuestion"
            :index="currentIndex"
            :total="TOTAL_QUESTIONS"
            @submit="onSubmit"
          />
        </div>

        <!-- 3) 결과 보기 -->
        <div
          v-else-if="!quizFinished && showResult"
          :key="`result-${currentIndex}`"
        >
          <ResultView
            :isCorrect="isCorrect"
            :correct="correctAnswer"
            :explanation="explanation"
            @next="onNext"
          />
        </div>

        <!-- 4) 요약 화면 -->
        <div v-else key="summary">
          <SummaryView
            :correctCount="correctCount"
            :total="TOTAL_QUESTIONS"
            @home="onHome"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header         from '../components/AppHeader.vue'
import CategorySelect from '../components/ProblemCategorySelect.vue'
import QuestionView   from '../components/QuestionView.vue'
import ResultView     from '../components/ResultView.vue'
import SummaryView    from '../components/SummaryView.vue'

import { fetchCategories }        from '../api/category'
import { loadNextQuestion, submitAnswer } from '../api/problem'
import { loadTodayDailyId, loadDailyResult }       from '../api/daily'
import router from '@/router'

const TOTAL_QUESTIONS = 10

const isLoggedIn       = ref(false)
const categories       = ref([])
const selectedCategory = ref(null)
const todayDaily       = ref(null)

const currentQuestion  = ref(null)
const currentIndex     = ref(0)      // 1부터 TOTAL까지
const correctCount     = ref(0)
const showResult       = ref(false)
const isCorrect        = ref(false)
const correctAnswer    = ref('')
const explanation      = ref('')
const currentDailyProblemId = ref(0)

// 전체 퀴즈가 끝나면 true
const quizFinished     = ref(false)

function handleLogin()  { isLoggedIn.value = true }
function handleLogout() { isLoggedIn.value = false }

// 1) 처음에 카테고리만 불러오기
onMounted(async () => {
  categories.value = await fetchCategories()
})

// 2) 카테고리 선택 시 초기화 + 1번 질문 로드
async function selectCategory(cat) {
    // 1) 선택된 카테고리 ID 저장
    selectedCategory.value = cat.categoryId

    // 2) loadTodayDailyId가 비동기라면 반드시 await
    //    예: res.data = { dailyId: 42, ... }
    const daily = await loadTodayDailyId(cat.categoryId)
    // 3) todayDaily에는 숫자 ID만 담아두기
    todayDaily.value = daily.dailyId

    // 4) 인덱스/상태 초기화
    currentIndex.value = 1
    correctCount.value = 0
    quizFinished.value = false
    showResult.value   = false
    loadQuestion()
}

// 3) 문제 불러오는 함수 — INDEX 체크 후 API 호출
async function loadQuestion() {
  // 1) MAX 초과 체크
  if (currentIndex.value > TOTAL_QUESTIONS) {
    quizFinished.value = true
    return
  }

  try {
    // 2) 전체 response 객체를 받아서…
    const res = await loadNextQuestion(todayDaily.value)

    console.log(res);
    

    // 3) 에러 코드가 아닌, 의도된 "끝" 신호도 2xx로 내려준다고 가정
    if (res.data.code === "NO_MORE_DAILY") {
      // 끝
      const { data: result } = await loadDailyResult(todayDaily.value)
      correctCount.value   = result.score
      quizFinished.value   = true
      showResult.value     = true
    }
    else {
      // 다음 문제
      const { dailyProblemId, sequence, problem } = res.data
      currentDailyProblemId.value = dailyProblemId
      currentIndex.value = sequence
      currentQuestion.value       = problem
      showResult.value            = false
    }
  }
  catch (err) {
    // 정말 예측 못 한 에러
    console.error('문제 로드 실패', err)
  }
}

// 4) 답 제출
async function onSubmit(selectedOptionIndex) {
  // 1) 클라이언트에서 정답 여부 판단
  console.log(currentQuestion.value.problemId);
  
  const ok = selectedOptionIndex === currentQuestion.value.correctOption
  isCorrect.value     = ok
  correctAnswer.value = currentQuestion.value.correctOption
  explanation.value   = currentQuestion.value.explanation

  if (ok) correctCount.value++

  // 2) 화면에 결과 보여주기
  showResult.value = true

  // 3) 서버에 응답 기록만 전송
  try {
    console.log(currentDailyProblemId);
    
    await submitAnswer({
      problemId: currentDailyProblemId.value,
      selectedOptionIndex,
      isCorrect: ok
    })
  } catch (err) {
    console.error('정답 제출 기록 실패', err)
  }
}

// 5) 다음 문제
function onNext() {
  currentIndex.value++
  loadQuestion()
}

// 6) 다시 시작 (카테고리 선택 화면으로)
function onHome() {
  router.push("/")
}
</script>
