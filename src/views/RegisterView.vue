<template>
  <div class="register-page">
    <div class="register-card">
      <h2>프로필 등록</h2>
      <p class="description">
        서비스를 이용하려면 프로필을 등록해주세요.
      </p>

      <form @submit.prevent="onSubmit" class="register-form">
        <!-- 프로필 사진 -->
        <div class="profile-image-upload">
          <label for="fileInput">
            <img
              :src="previewUrl"
              class="avatar-preview"
              alt="프로필 이미지"
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              @change="onFileChange"
            />
          </label>
        </div>

        <!-- 사용자 이름 -->
        <label>
          사용자 이름
          <input
            v-model="username"
            type="text"
            placeholder="사용자 이름을 입력하세요"
            required
          />
        </label>

        <!-- 이메일 + 인증 요청 -->
        <label>
          이메일
          <div class="email-verification">
            <input
              v-model="email"
              type="email"
              placeholder="이메일을 입력하세요"
              :disabled="emailVerified"
              required
            />
            <button
              type="button"
              class="btn-verify"
              :disabled="!emailOk || sending"
              @click="sendVerification"
            >
              {{ sending ? '전송중…' : emailSent ? '재전송' : '인증' }}
            </button>
          </div>
        </label>
        <p v-if="verificationMessage" class="verification-msg">
          {{ verificationMessage }}
        </p>

        <!-- 인증번호 입력 & 확인 -->
        <div v-if="emailSent && !emailVerified" class="code-verification">
          <input
            v-model="verificationCode"
            type="text"
            placeholder="인증번호를 입력하세요"
          />
          <button
            type="button"
            class="btn-confirm-code"
            :disabled="!verificationCode || verifying"
            @click="verifyCode"
          >
            {{ verifying ? '확인중…' : '인증 확인' }}
          </button>
        </div>
        <p v-if="codeError" class="error-msg">{{ codeError }}</p>
        <p v-if="emailVerified" class="success-msg">이메일 인증 완료 ✅</p>

        <!-- 생년월일 -->
        <label>
          생년월일
          <input
            v-model="birthday"
            type="date"
            required
          />
        </label>

        <!-- 최종 제출 -->
        <div class="actions">
          <button
            type="submit"
            class="btn-confirm"
            :disabled="!isValid || loading"
          >
            {{ loading ? '등록중…' : '등록 완료' }}
          </button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'
import { useUserStore } from '@/stores/userStore'

const router    = useRouter()
const userStore = useUserStore()

// 폼 필드
const username = ref(userStore.user?.nickname || '')
const email    = ref('')
const birthday = ref('')

// 프로필 이미지 업로드
const selectedFile = ref(null)
// Pinia에 저장된 기본 프로필 이미지 또는 로컬 프리뷰
const previewUrl = ref(userStore.user?.profileImage || '/assets/default-avatar.png')
function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

// 인증 상태
const sending            = ref(false)
const emailSent          = ref(false)
const verificationMessage = ref('')
const emailVerified      = ref(false)

// 인증번호 입력 상태
const verificationCode = ref('')
const verifying        = ref(false)
const codeError        = ref('')

// 최종 제출 상태
const loading = ref(false)
const error   = ref('')

// 유효성 검사
const emailOk = computed(() => /\S+@\S+\.\S+/.test(email.value))
const isValid = computed(() => {
  const nameOk = username.value.trim().length >= 2
  const bdOk   = !!birthday.value
  return nameOk && bdOk && emailVerified.value
})

// 1) 이메일 인증번호 전송
async function sendVerification() {
  if (!emailOk.value) return
  sending.value = true
  verificationMessage.value = ''
  codeError.value = ''
  emailVerified.value = false
  try {
    await axios.get('/api/v1/user/email/send', {
      params: { email: email.value.trim() }
    })
    emailSent.value = true
    verificationMessage.value = '인증 번호를 이메일로 전송했습니다.'
  } catch (err) {
    verificationMessage.value = err.response?.data?.message
      || '인증 요청 중 오류가 발생했습니다.'
  } finally {
    sending.value = false
  }
}

// 2) 인증번호 확인
async function verifyCode() {
  if (!verificationCode.value) return
  verifying.value = true
  codeError.value = ''
  try {
    await axios.post('/api/v1/user/email/verify', {
      email:    email.value.trim(),
      authCode: verificationCode.value.trim()
    })
    emailVerified.value = true
  } catch (err) {
    codeError.value = err.response?.data?.message
      || '인증 번호가 올바르지 않습니다.'
  } finally {
    verifying.value = false
  }
}

// 3) 최종 프로필 등록
async function onSubmit() {
  if (!isValid.value) return
  loading.value = true
  error.value   = ''

  try {
    // 1) (선택) 이미지가 선택되어 있으면, AWS에 업로드하고 URL 획득
    let imageUrl = previewUrl.value  // 기본값: 기존 Pinia store에 있던 URL
    if (selectedFile.value) {
      // 예: /api/v1/user/upload-profile-photo 에 파일 바이너리 PUT
      // (프리사인 URL을 먼저 가져오는 단계가 필요하다면 그걸 추가)
      const form = new FormData()
      form.append('file', selectedFile.value)
      const uploadRes = await axios.post(
        '/api/v1/user/upload-profile-photo',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      // 응답에서 AWS S3의 public URL을 받는다고 가정
      imageUrl = uploadRes.data.url
    }

    // 2) 프로필 등록 API에 JSON 바디로 전송
    const payload = {
      username:        username.value.trim(),
      email:           email.value.trim(),
      birthDate:       birthday.value,       // 서버가 기대하는 필드명
      profileImageUrl: imageUrl
    }

    await axios.post('/api/v1/user/register', payload)
    // 3) 유저 정보 갱신 & 리디렉트
    await userStore.fetchUser()
    router.replace({ name: 'Main' })

  } catch (err) {
    error.value = err.response?.data?.message
      || '등록 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  if (userStore.user) {
    username.value = userStore.user.nickname || ''
    // Pinia의 profileImage가 있으면 previewUrl로 사용
    if (userStore.user.profileImage) {
      previewUrl.value = userStore.user.profileImage
    }
  }
})
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: #f8f9fa;
  min-height: calc(100vh - 72px);
}

.register-card {
  background: #fff;
  padding: 30px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  max-width: 360px;
  width: 100%;
  /* 카드 제목·설명만 중앙 정렬 */
  text-align: center;
}

.register-card > h2,
.register-card > .description {
  text-align: center;
}

/* 프로필 이미지 업로드 영역을 flex로 감싸서 중앙 정렬 */
.profile-image-upload {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.profile-image-upload input[type="file"] {
  display: none;
}
.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  border: 2px solid #ccc;
}

/* 카드 내부 제목/설명 */
.register-card h2 {
  margin-bottom: 8px;
  font-size: 1.5em;
}
.description {
  margin-bottom: 24px;
  color: #555;
  font-size: 0.95em;
}

/* 폼 전체는 왼쪽 정렬 */
.register-form {
  text-align: left;
}

/* 라벨 + 인풋 그리드 레이아웃 */
.register-form label {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 12px;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.9em;
  color: #333;
}
.register-form label > input {
  width: 100%;
  margin-top: 0;
  padding: 6px 8px;
  height: 32px;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: left;
}

/* 이메일 인증 UI */
.email-verification {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}
.email-verification input {
  flex: 1;
}
.btn-verify {
  padding: 8px 12px;
  background: #42a5f5;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-verify:disabled {
  background: #90caf9;
  cursor: default;
}
.verification-msg {
  text-align: left;
  color: #388e3c;
  margin: 4px 0;
  font-size: 0.85em;
}

/* 인증번호 확인 */
.code-verification {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}
.code-verification input {
  flex: 1;
  padding: 6px 8px;
  height: 32px;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}
.btn-confirm-code {
  padding: 6px 10px;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-confirm-code:disabled {
  opacity: 0.6;
  cursor: default;
}

/* 날짜 입력 */
.register-form input[type="date"] {
  padding: 6px 8px;
  height: 32px;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

/* 제출 버튼 */
.actions {
  margin-top: 20px;
}
.btn-confirm {
  width: 100%;
  padding: 10px 0;
  background: #42a5f5;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-confirm:disabled {
  background: #90caf9;
  cursor: default;
}

/* 메시지 */
.error-msg {
  color: #e53935;
  text-align: left;
  margin: 4px 0;
  font-size: 0.85em;
}
.success-msg {
  color: #4caf50;
  text-align: left;
  margin: 4px 0;
  font-size: 0.85em;
}
.error {
  margin-top: 16px;
  color: #e53935;
  font-size: 0.85em;
}
</style>
