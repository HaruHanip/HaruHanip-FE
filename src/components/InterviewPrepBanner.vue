<template>
  <div class="interview-banner-box">
    <div class="banner-content">
      <h3>인터뷰 준비 모드</h3>
      <p>CS 개념을 요약받아보세요!</p>
      <button class="enter-btn" @click="goToInterview">모드 바로가기</button>
    </div>
  </div>
</template>

<script setup>
/* global defineEmits */
/* eslint-disable-next-line no-undef */
const emit = defineEmits(['go-to-interview-mode'])

function goToInterview() {
  emit('go-to-interview-mode')
}
</script>

<style scoped>
.interview-banner-box {
  background: linear-gradient(45deg, #ffab91, #ffccbc);
  color: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* hover 효과를 위한 transition 추가 */
}
.interview-banner-box:hover {
  transform: translateY(-6px); /* 살짝 떠오르는 효과 */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* 그림자 진하게 */
}
.interview-banner-box::before {
  content: '✨';
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 4em;
  opacity: 0.3;
  transform: rotate(20deg);
}
.banner-content h3 {
  margin-bottom: 12px;
  font-size: 1.8em;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}
.banner-content p {
  font-size: 1.2em;
  margin-bottom: 20px;
  line-height: 1.4;
}
.enter-btn {
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  border: none;
  padding: 12px 25px;
  border-radius: 25px; /* 다른 버튼과 통일된 필 모양 */
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.enter-btn:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.02); /* 다른 버튼과 동일한 호버 스케일 효과 */
}
</style>
