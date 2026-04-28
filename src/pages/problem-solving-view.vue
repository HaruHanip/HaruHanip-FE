<template>
  <div class="main-screen">
    <AppHeader />

    <main class="content-area">
      <div class="problem-solving">
        <!-- 1) 카테고리 선택 -->
        <ProblemCategorySelect
          v-if="!store.selectedCategoryId"
          :categories="store.categories"
          @select="cat => store.selectCategory(cat.categoryId)"
        />

        <!-- 2) 문제 풀이 -->
        <QuestionView
          v-else-if="!store.quizFinished && !store.showResult && store.currentQuestion"
          :key="`question-${store.currentIndex}`"
          :question="store.currentQuestion"
          :index="store.currentIndex"
          :total="store.TOTAL_QUESTIONS"
          @submit="store.submitAnswerAction"
        />

        <!-- 3) 결과 보기 -->
        <ResultView
          v-else-if="!store.quizFinished && store.showResult"
          :key="`result-${store.currentIndex}`"
          :isCorrect="store.isCorrect"
          :correct="store.correctAnswer"
          :explanation="store.explanation"
          @next="store.proceedToNext"
        />

        <!-- 4) 요약 화면 -->
        <SummaryView
          v-else
          :correctCount="store.correctCount"
          :total="store.TOTAL_QUESTIONS"
          @home="onHome"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionStore } from '@/stores/useQuestionStore'
import AppHeader from '@/components/common/AppHeader.vue'
import ProblemCategorySelect from '@/components/question/ProblemCategorySelect.vue'
import QuestionView from '@/components/question/QuestionView.vue'
import ResultView from '@/components/question/ResultView.vue'
import SummaryView from '@/components/question/SummaryView.vue'

const router = useRouter()
const store = useQuestionStore()

onMounted(() => {
  store.reset()
  store.fetchCategoriesAction()
})

function onHome() {
  store.reset()
  router.push('/')
}
</script>

<style scoped>
.main-screen {
  width: 60%;
  margin: 0 auto;
  padding: 16px var(--page-padding-x);
  min-height: 100dvh;
}

.content-area {
  margin-top: 24px;
}

@media (max-width: 640px) {
  .main-screen {
    width: 100%;
    padding: 12px var(--page-padding-x-mobile);
  }

  .content-area {
    margin-top: 16px;
  }
}
</style>
