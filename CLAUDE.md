Frontend Rules (Vue 3 + Vite)

Architecture
src/
├── pages/          # 라우트 단위 페이지 컴포넌트
├── components/     # 재사용 컴포넌트 (도메인별 서브폴더)
│   ├── question/
│   ├── challenge/
│   └── common/
├── composables/    # Vue 컴포저블 (useQuestion, useChallenge 등)
├── stores/         # Pinia 스토어 (도메인별)
├── api/            # API 호출 모듈 (axios 래퍼)
├── types/          # TypeScript 타입 정의
└── assets/

Component Rules

<script setup lang="ts"> 사용 (Options API 금지)
컴포넌트명: PascalCase (QuestionCard.vue)
파일명: PascalCase (컴포넌트), kebab-case (페이지)
props는 타입 명시 필수, 기본값은 withDefaults 사용
컴포넌트 크기: 200줄 초과 시 분리 고려

State Management (Pinia)

도메인별 스토어 분리: useQuestionStore, useUserStore, useChallengeStore
API 호출은 스토어 action에서만, 컴포넌트에서 직접 호출 금지
비회원 상태: isGuest 플래그로 기능 제한 처리

API 호출 패턴

src/api/ 모듈에서 axios 인스턴스 사용
응답 인터셉터에서 공통 에러 처리 (401 → 로그인 페이지 리다이렉트)
API 함수명: fetchTodayQuestions, submitAnswer 형식

Routing

Vue Router 4 사용
인증 필요 라우트: meta: { requiresAuth: true } 명시
비회원 접근 가능 라우트: meta: { guest: true } 명시
네비게이션 가드에서 인증 체크

Key UX Rules

챌린지 도장판: 7칸 그리드, 완료/미완료/오늘 상태 3가지
문제 풀이 중 새로고침 시 답 초기화 (비회원 의도적 미저장)
해설은 정답 제출 후에만 노출 (제출 전 해설 버튼 비활성화)
로딩 상태는 skeleton UI 사용 (스피너 단독 사용 지양)

TypeScript

strict: true 설정 유지
any 사용 금지, 불가피한 경우 unknown + 타입 가드 사용
API 응답 타입은 src/types/api.ts에 정의
