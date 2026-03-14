# AI 사용 내역

## 사용 도구 및 모델

| 도구               | 용도                                            |
| ------------------ | ----------------------------------------------- |
| Claude (Anthropic) | 기술 스택 결정, 아키텍처 설계, 구현 방향 질의   |
| Cursor AI          | Claude가 제안한 코드 생성, 복잡한 로직 2차 검증 |

---

## 적용한 작업 범위

### 1. 기술 스택 및 아키텍처 결정

- Vite + React 18 + TypeScript, Tailwind CSS v4, TanStack Query v5, Zustand 조합 결정

### 2. 인증 흐름 설계

- axios interceptor 기반 401 토큰 자동 갱신 및 새로고침 시 토큰 복구 로직 설계
- openapi.yaml 기반 보호 라우트 적용 범위 검토

### 3. 공통 컴포넌트 및 에러/로딩 처리

- 공통 컴포넌트 목록 정의 (Button, Input, Modal, Badge, Card, EmptyState 등)
- Layout 단 Suspense + ErrorBoundary 적용 위치 및 예외 처리 전략 설계

### 4. 할 일 목록 성능 최적화

- 가상 스크롤 + 무한 스크롤 조합 설계 (useVirtualizer + useSuspenseInfiniteQuery)
- 렌더링 최적화 방법 검토 (useMemo, React.memo)

### 5. 기타

- MSW 핸들러 구조 설계 및 Vercel 배포 설정

---

## 핵심 프롬프트 요약

## 전체적인 프롬프트 내용은 [project-overview.mdc](./project-overview.mdc)에 정리되어 있습니다.

## 사람이 최종 검증한 내용

- openapi.yaml 명세와 MSW 핸들러 응답 구조 일치 여부 직접 검토
- 토큰 저장 방식 (메모리 vs localStorage) 수정
- 401 에러 발생 및 새로고침 시 토큰 재호출 로직 추가
- 로그인 하지 않은 경우 로그인 페이지로 리다이렉트 하도록 라우터 가드 추가
- Suspense + ErrorBoundary vs QueryBoundary 방식을 직접 비교 검토 후
  data 타입 안전성과 코드 간결성을 이유로 Suspense 방식으로 결정
- UI 개발 시 글로벌 CSS, 색상 디자인 토큰 적용 후 공통 컴포넌트를 기반으로 개발하도록 지시
- 가상 스크롤 동작 (스크롤 감지 시점, overscan 값) 브라우저에서 직접 테스트
- 존재하지 않는 라우트 접근 시 에러 화면 직접 발견 및 수정 방향 결정
- 배포 환경에서 MSW 동작하도록 추가

---
