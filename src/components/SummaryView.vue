<template>
  <div class="summary-card">
    <div class="summary-header">
      <h2>{{ titleMessage }}</h2>
      <p class="score-text">총 <span class="correct">{{ props.correctCount }}</span> / <span class="total">{{ props.total }}</span> 개 정답</p>
    </div>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <p class="progress-percent">{{ progressPercent }}%</p>
    </div>
    <div class="actions">
      <button class="pill-btn home-btn" @click="$emit('home')">홈으로</button>
      <button class="pill-btn share-btn" @click="shareResult">결과 공유하기</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

// props 정의 및 로컬 변수로 할당
const props = defineProps({
  correctCount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

// 진도율 계산 (percent)
const progressPercent = computed(() => Math.round((props.correctCount / props.total) * 100))

// 상태에 따른 동적 타이틀
const titleMessage = computed(() => {
  const percent = progressPercent.value
  if (percent === 100) return '모두 정답! 대단해요! 🎉'
  if (percent >= 70) return '수고했어요! 잘했어요! 👍'
  if (percent >= 40) return '괜찮아요, 다음엔 더 잘할 수 있어요! 🙌'
  return '조금 더 연습해 봐요! 💪'
})

// Web Share API 또는 복사 팝업
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
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 480px;
  margin: 40px auto;
  text-align: center;
}

.summary-header h2 {
  margin: 0;
  font-size: 1.6em;
  color: #333333;
}

.score-text {
  margin-top: 8px;
  font-size: 1em;
  color: #555555;
}

.correct {
  color: #4caf50;
  font-weight: 600;
}

.total {
  color: #999999;
}

.progress-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.progress-bar {
  width: 200px;
  height: 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #42a5f5;
  border-radius: 6px 0 0 6px;
  transition: width 0.5s ease;
}

.progress-percent {
  font-size: 0.95em;
  color: #333333;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.pill-btn {
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.restart-btn {
  background-color: #4caf50;
  color: white;
}
.restart-btn:hover { background-color: #388e3c; transform: translateY(-2px); }

.share-btn {
  background-color: #ffb300;
  color: white;
}
.share-btn:hover { background-color: #ffa000; transform: translateY(-2px); }
</style>