<template>
  <div class="summary-card">
    <div class="summary-header">
      <h2>{{ titleMessage }}</h2>
      <p class="score-text">
        총 <span class="score-correct">{{ correctCount }}</span> / <span class="score-total">{{ total }}</span> 개 정답
      </p>
    </div>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <p class="progress-percent">{{ progressPercent }}%</p>
    </div>
    <div class="actions">
      <button class="pill-btn home-btn" @click="emit('home')">홈으로</button>
      <button class="pill-btn share-btn" @click="shareResult">결과 공유하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  correctCount: number
  total: number
}>()

const emit = defineEmits<{
  home: []
}>()

const progressPercent = computed(() => Math.round((props.correctCount / props.total) * 100))

const titleMessage = computed(() => {
  const percent = progressPercent.value
  if (percent === 100) return '모두 정답! 대단해요! 🎉'
  if (percent >= 70) return '수고했어요! 잘했어요! 👍'
  if (percent >= 40) return '괜찮아요, 다음엔 더 잘할 수 있어요! 🙌'
  return '조금 더 연습해 봐요! 💪'
})

function shareResult() {
  const shareText = `하루한CS 퀴즈 결과: ${props.correctCount}/${props.total} (${progressPercent.value}%)`
  if (navigator.share) {
    navigator.share({ title: '하루한CS 퀴즈 결과', text: shareText }).catch(() => {})
  } else {
    window.prompt('결과를 복사하세요:', shareText)
  }
}
</script>

<style scoped>
.summary-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 28px 24px;
  width: 100%;
  max-width: 480px;
  margin: 20px auto;
  text-align: center;
}

.summary-header h2 {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  color: var(--color-text);
  margin-bottom: 8px;
}

.score-text {
  font-size: clamp(0.9rem, 3vw, 1rem);
  color: var(--color-text-muted);
}

.score-correct { color: var(--color-primary); font-weight: 600; }
.score-total { color: #999999; }

.progress-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  max-width: 240px;
  height: 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-blue);
  border-radius: 6px 0 0 6px;
  transition: width 0.5s ease;
}

.progress-percent {
  font-size: 0.95rem;
  color: var(--color-text);
  font-weight: 600;
  width: 48px;
  text-align: left;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.pill-btn {
  flex: 1;
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 500;
  min-height: 48px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.home-btn { background-color: var(--color-primary); color: white; }
.home-btn:hover { background-color: var(--color-primary-dark); transform: translateY(-2px); }

.share-btn { background-color: #ffb300; color: white; }
.share-btn:hover { background-color: #ffa000; transform: translateY(-2px); }

@media (max-width: 640px) {
  .summary-card {
    padding: 20px 16px;
    margin: 12px auto;
  }

  .actions {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
