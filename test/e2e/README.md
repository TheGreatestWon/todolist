# E2E 테스트

## 개요
Playwright를 사용한 사용자 시나리오 기반 통합 테스트입니다.

## 참조 문서
- 사용자 시나리오: `docs/3-user-scenario.md`
- PRD: `docs/2-PRD.md`
- 도메인 정의: `docs/1-domain-definition.md`

## 테스트 구성

### 01-user-registration.spec.ts
**사용자 등록 및 인증**
- 시나리오 A: 첫 방문 사용자의 회원가입
- 시나리오 B: 중복 이메일로 가입 시도
- 로그인 성공

### 02-todo-management.spec.ts
**할 일 관리**
- 시나리오 A: 제목만으로 간단한 할 일 추가
- 시나리오 B: 상세 정보와 마감일을 포함한 할 일 추가
- 시나리오 C: 완료 처리
- 시나리오 D: 할 일 삭제

### 03-todo-sorting.spec.ts
**할 일 정렬 및 분류**
- 마감일 기반 정렬 확인
- 완료/미완료 분리 확인

## 실행 방법

### 사전 준비
1. 백엔드 서버 실행: `http://localhost:3001`
2. 프론트엔드 서버 실행: `http://localhost:3000`

### 테스트 실행
```bash
# 모든 테스트 실행
npm run test:e2e

# 특정 테스트 파일 실행
npx playwright test test/e2e/01-user-registration.spec.ts

# UI 모드로 실행 (디버깅)
npx playwright test --ui

# 헤드풀 모드로 실행 (브라우저 보기)
npx playwright test --headed
```

### 테스트 결과 확인
```bash
# HTML 리포트 보기
npx playwright show-report test/e2e/report
```

## 테스트 결과 파일
- `test/e2e/report/` - HTML 리포트
- `test/e2e/results.json` - JSON 결과
- `test/e2e/screenshots/` - 실패 시 스크린샷
- `test/e2e/videos/` - 실패 시 비디오

## 주의사항
- 테스트는 순차적으로 실행됩니다 (데이터베이스 상태 의존성)
- 각 테스트는 고유한 이메일을 사용합니다 (타임스탬프 기반)
- 실패한 테스트는 자동으로 스크린샷과 비디오가 저장됩니다

## 검증 항목

### 회원가입 및 로그인
- [x] 유효한 이메일과 비밀번호로 회원가입
- [x] 중복 이메일 가입 차단
- [x] 로그인 성공 후 리다이렉트
- [x] 로그아웃 버튼 표시

### 할 일 생성
- [x] 제목만으로 할 일 추가
- [x] 상세 정보와 마감일 포함 추가
- [x] 목록에 즉시 표시

### 할 일 관리
- [x] 완료 처리 (체크박스)
- [x] 완료 상태 시각적 표시
- [x] 할 일 삭제
- [x] 삭제 확인 대화상자

### 정렬 및 분류
- [x] 마감일 기반 정렬
- [x] 기한 경과 할 일 상단 표시
- [x] 완료/미완료 분리 표시

## 버전 이력
- v1.0.0 (2026-02-13): 초기 E2E 테스트 작성
  - 사용자 등록 및 로그인 테스트
  - 할 일 CRUD 테스트
  - 정렬 및 분류 테스트
