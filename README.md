# KB 헬스케어 프론트엔드 과제

## 📌 프로젝트 개요

React 18 + TypeScript 기반의 프로젝트입니다.
할 일 관리 서비스의 대시보드, 로그인, 할 일 목록/상세, 회원정보 페이지로 구성되어 있습니다.
백엔드 없이 MSW(Mock Service Worker)를 활용하여 API를 목킹하였습니다.

---

## 🛠 기술 스택

| 분류        | 기술                                               |
| ----------- | -------------------------------------------------- |
| 프레임워크  | React 18, TypeScript                               |
| 빌드 도구   | Vite                                               |
| 스타일      | Tailwind CSS (색상 토큰 관리)                      |
| 상태 관리   | Zustand (인증 토큰), TanStack Query v5 (서버 상태) |
| 라우팅      | React Router v6                                    |
| 폼 유효성   | React Hook Form + Zod                              |
| 가상 스크롤 | TanStack Virtual                                   |
| API 목킹    | MSW (Mock Service Worker)                          |
| 아이콘      | Lucide React                                       |
| 폰트        | Pretendard (self-hosted)                           |

---

## 📁 폴더 구조

```
src/
├── api/                # API 함수 모음
├── components/         # 공통 컴포넌트
│   ├── GNB/            # 글로벌 네비게이션 바
│   ├── LNB/            # 로컬 네비게이션 바
│   └── Modal/          # 공통 모달
├── hooks/              # 커스텀 훅
├── mocks/              # MSW 핸들러
│   ├── handlers.ts
│   └── browser.ts
├── pages/              # 페이지 컴포넌트
│   ├── Dashboard/      # 대시보드 (/)
│   ├── SignIn/         # 로그인 (/sign-in)
│   ├── Task/           # 할 일 목록 (/task)
│   ├── TaskDetail/     # 할 일 상세 (/task/:id)
│   └── User/           # 회원정보 (/user)
├── stores/             # Zustand 스토어
├── styles/             # 전역 스타일, 폰트
├── types/              # 공통 타입 정의
└── router.tsx          # 라우터 설정
```

---

## 🚀 시작하기

### 요구사항

- Node.js v20 이상

### 설치 및 실행

```bash
# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

---

## 📄 페이지 구성

| 경로        | 페이지     | 설명                           |
| ----------- | ---------- | ------------------------------ |
| `/`         | 대시보드   | 전체/완료/미완료 할 일 수 표시 |
| `/sign-in`  | 로그인     | 이메일 + 비밀번호 로그인       |
| `/task`     | 할 일 목록 | 가상 스크롤 + 무한 스크롤      |
| `/task/:id` | 할 일 상세 | 상세 정보 조회 및 삭제         |
| `/user`     | 회원정보   | 로그인한 유저 정보 표시        |

---

## 🔐 인증 전략

보안을 고려하여 아래와 같이 토큰을 관리합니다.

- **accessToken** → Zustand (메모리 저장)
  - XSS 공격으로부터 안전하게 메모리에만 유지
- **refreshToken** → localStorage
  - 새로고침 시에도 로그인 상태 유지
- **토큰 만료 시** → axios interceptor에서 `/api/refresh` 자동 호출 후 원래 요청 재시도
- **갱신 실패 시** → 로그인 페이지로 리다이렉트

---

## 🎨 색상 토큰

Tailwind CSS config에서 색상을 토큰으로 관리합니다.

```js
colors: {
  primary: '#3B82F6',    // 주요 액션, 버튼
  disabled: '#9CA3AF',   // 비활성화 상태
  danger: '#EF4444',     // 삭제, 에러
  success: '#10B981',    // 완료 상태
}
```

---

## 🧪 API 목킹 (MSW)

별도의 백엔드 서버 없이 MSW를 활용하여 API를 목킹합니다.
`openapi.yaml` (OAS 3.1) 명세를 기준으로 핸들러를 작성하였습니다.

목킹 대상 엔드포인트:

```
POST   /api/sign-in       로그인
POST   /api/refresh       토큰 갱신
GET    /api/user          회원정보 조회
GET    /api/dashboard     대시보드 데이터 조회
GET    /api/task          할 일 목록 조회 (페이지네이션)
GET    /api/task/:id      할 일 상세 조회
DELETE /api/task/:id      할 일 삭제
```

---

## 🤖 AI 활용

Agent AI 활용 내역은 [AI_USAGE.md](./AI_USAGE.md)를 참고해주세요.

---
