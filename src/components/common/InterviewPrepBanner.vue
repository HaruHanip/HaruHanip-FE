<template>
  <div class="interview-banner-box">
    <div class="banner-content">
      <h3>인터뷰 준비 모드</h3>
      <p>CS 개념을 요약받아보세요!</p>
      <button class="enter-btn" @click="goToInterview">모드 바로가기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'go-to-interview-mode': []
}>()

function goToInterview() {
  emit('go-to-interview-mode')
}
</script>

<style scoped>
.interview-banner-box {
  background: linear-gradient(45deg, #ffab91, #ffccbc);
  color: white;
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.interview-banner-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.interview-banner-box::before {
  content: '✨';
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 4em;
  opacity: 0.3;
  transform: rotate(20deg);
  pointer-events: none;
}

.banner-content {
  text-align: center;
}

.banner-content h3 {
  margin-bottom: 8px;
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.banner-content p {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  margin-bottom: 16px;
  line-height: 1.4;
}

.enter-btn {
  background-color: rgba(255, 255, 255, 0.85);
  color: #333;
  border: none;
  padding: 10px 22px;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: bold;
  min-height: 44px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.enter-btn:hover {
  background-color: white;
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .interview-banner-box {
    padding: 18px 16px;
  }

  .enter-btn {
    width: 100%;
  }
}
</style>
