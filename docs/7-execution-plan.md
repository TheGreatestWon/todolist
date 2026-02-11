# 실행 계획서 (Execution Plan)
# Personal Todo Management System MVP

**문서 버전:** 2.0
**작성일:** 2026-02-11
**프로젝트명:** 개인 할 일 관리 시스템
**MVP 출시 목표:** 이번주 금요일 오후
**개발 기간:** 3일 (Day 1-3)
**개발 방식:** 단계별 순차 개발 (Phase 0 → Phase 5)

---

## 📋 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [실행 계획 원칙](#2-실행-계획-원칙)
3. [Phase 0: 프로젝트 초기 설정](#phase-0-프로젝트-초기-설정)
4. [Phase 1: 데이터베이스 구축](#phase-1-데이터베이스-구축)
5. [Phase 2: 백엔드 개발](#phase-2-백엔드-개발)
6. [Phase 3: 프론트엔드 개발](#phase-3-프론트엔드-개발)
7. [Phase 4: 통합 및 테스트](#phase-4-통합-및-테스트)
8. [Phase 5: 배포](#phase-5-배포)
9. [일정 타임라인](#9-일정-타임라인)
10. [리스크 및 완화 방안](#10-리스크-및-완화-방안)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 정보
- **프로젝트명:** Personal Todo Management System
- **목표:** 개인 사용자를 위한 할 일 관리 웹 애플리케이션 MVP 출시
- **핵심 가치:** 단순함, 보안, 직관성

### 1.2 기술 스택
- **프론트엔드:** React 19 + TypeScript
- **백엔드:** Node.js + Express + TypeScript
- **데이터베이스:** PostgreSQL 17 (pg 라이브러리 사용)
- **배포:** Vercel
- **인증:** JWT (jsonwebtoken)
- **암호화:** bcrypt

### 1.3 핵심 기능 (MVP 범위)
1. 사용자 회원가입 및 로그인
2. 할 일 생성, 조회, 수정, 삭제
3. 할 일 완료/미완료 처리
4. 마감일 기반 자동 분류 (오늘/예정/기한 경과)
5. 반응형 UI (모바일/데스크탑)

### 1.4 제외 기능
- 할 일 공유 및 협업
- 카테고리, 태그, 우선순위
- 반복 일정, 알림, 통계

---

## 2. 실행 계획 원칙

### 2.1 개발 원칙
- ✅ **KISS (Keep It Simple):** 단순함 우선
- ✅ **YAGNI (You Aren't Gonna Need It):** MVP에 정의된 기능만 구현
- ✅ **Fail Fast:** 오류는 빠르게 발견하고 명확하게 보고
- ✅ **Secure by Default:** 보안은 선택이 아닌 기본

### 2.2 Task 관리 원칙
- 각 Task는 **독립적으로 완료 가능**해야 함
- 각 Task는 **명확한 완료 조건**을 가짐
- 각 Task는 **1-4시간 이내** 완료 가능
- 의존성이 있는 Task는 순서대로 진행

### 2.3 품질 기준
- 모든 코드는 TypeScript strict 모드 통과
- 모든 API는 Postman으로 테스트 완료
- 모든 인수 기준 충족
- 보안 취약점 0건

---

## Phase 0: 프로젝트 초기 설정

**목표:** 개발 환경 설정 및 프로젝트 구조 생성
**예상 시간:** 1시간
**담당:** 풀스택 개발자
**의존성:** 없음

---

### Task 0.1: 개발 환경 준비

**설명:** Node.js, PostgreSQL, Git 등 개발 도구 설치 및 확인

**완료 조건:**
- [X] Node.js 18+ 설치 확인 (`node --version`)
- [X] npm 9+ 설치 확인 (`npm --version`)
- [X] PostgreSQL 17 설치 및 실행 확인
- [X] Git 설치 확인
- [X] VS Code 설치 (권장)
- [X] Postman 또는 Thunder Client 설치

**산출물:** 없음

**예상 시간:** 30분

---

### Task 0.2: 프로젝트 디렉토리 구조 생성

**설명:** 백엔드, 프론트엔드 디렉토리 및 기본 파일 생성

**완료 조건:**
- [X] 루트 디렉토리 생성 (`todolist/`)
- [X] 백엔드 디렉토리 생성 (`backend/`)
- [X] 프론트엔드 디렉토리 생성 (`frontend/`)
- [X] 문서 디렉토리 생성 (`docs/`)
- [X] `.gitignore` 파일 생성 (node_modules, .env 제외)
- [X] `README.md` 파일 작성 (프로젝트 소개)

**산출물:**
- `todolist/` 디렉토리 구조
- `.gitignore`
- `README.md`

**예상 시간:** 15분

---

### Task 0.3: 백엔드 프로젝트 초기화

**설명:** Express + TypeScript 프로젝트 초기화 및 패키지 설치

**완료 조건:**
- [X] `cd backend && npm init -y` 실행
- [X] TypeScript 설치 (`npm install -D typescript @types/node @types/express`)
- [X] Express 설치 (`npm install express`)
- [X] 필수 패키지 설치:
  - [X] `pg` (PostgreSQL 클라이언트)
  - [X] `bcrypt` 및 `@types/bcrypt`
  - [X] `jsonwebtoken` 및 `@types/jsonwebtoken`
  - [X] `dotenv`
  - [X] `cors` 및 `@types/cors`
- [X] `tsconfig.json` 생성 및 설정
- [X] `package.json` scripts 설정 (`dev`, `build`, `start`)

**산출물:**
- `backend/package.json`
- `backend/tsconfig.json`
- `backend/node_modules/`

**예상 시간:** 15분

---

### Task 0.4: 프론트엔드 프로젝트 초기화

**설명:** React + TypeScript 프로젝트 초기화

**완료 조건:**
- [X] `npx create-react-app frontend --template typescript` 실행
- [X] React Router 설치 (`npm install react-router-dom`)
- [X] 불필요한 파일 제거 (logo, test files)
- [X] `src/` 디렉토리 정리
- [X] `.env.example` 파일 생성

**산출물:**
- `frontend/` React 프로젝트
- `frontend/.env.example`

**예상 시간:** 15분

---

## Phase 1: 데이터베이스 구축

**목표:** PostgreSQL 데이터베이스 생성 및 스키마 초기화
**예상 시간:** 1시간
**담당:** 백엔드 개발자
**의존성:** Phase 0 완료

---

### Task 1.1: PostgreSQL 데이터베이스 생성

**설명:** PostgreSQL에 `todolist` 데이터베이스 생성

**완료 조건:**
- [X] PostgreSQL 서버 실행 확인
- [X] `createdb todolist` 명령 실행 (또는 pgAdmin 사용)
- [X] 데이터베이스 접속 확인 (`psql -d todolist`)
- [X] 사용자 권한 확인

**산출물:**
- `todolist` 데이터베이스

**예상 시간:** 15분

---

### Task 1.2: 데이터베이스 스키마 생성

**설명:** `database/schema.sql` 파일을 사용하여 테이블, 인덱스, 트리거 생성

**완료 조건:**
- [X] `database/schema.sql` 파일 확인 (이미 생성됨)
- [X] `psql -d todolist -f database/schema.sql` 실행
- [X] `users` 테이블 생성 확인 (`\dt users`)
- [X] `todos` 테이블 생성 확인 (`\dt todos`)
- [X] 인덱스 생성 확인 (`\di`)
- [X] 트리거 생성 확인 (`\df update_updated_at_column`)
- [X] 외래 키 제약 확인 (`\d todos`)

**산출물:**
- `users` 테이블
- `todos` 테이블
- 5개 인덱스
- 2개 트리거

**예상 시간:** 15분

---

### Task 1.3: 데이터베이스 연결 테스트

**설명:** 백엔드에서 PostgreSQL 연결 설정 및 테스트

**완료 조건:**
- [X] `backend/src/config/database.ts` 파일 생성
- [X] `pg` 라이브러리를 사용한 연결 풀 설정
- [X] 환경 변수 `DATABASE_URL` 사용
- [X] `.env.example` 파일에 `DATABASE_URL` 템플릿 추가
- [X] `.env` 파일 생성 (로컬 DB URL 설정)
- [X] 연결 테스트 쿼리 실행 (`SELECT NOW()`)
- [X] 에러 핸들링 구현

**산출물:**
- `backend/src/config/database.ts`
- `backend/.env.example`
- `backend/.env` (gitignore에 포함)

**예상 시간:** 20분

---

### Task 1.4: 샘플 데이터 삽입 (선택)

**설명:** 개발/테스트를 위한 샘플 사용자 및 할 일 데이터 삽입

**완료 조건:**
- [X] ERD 문서의 샘플 데이터 SQL 확인
- [X] 테스트 사용자 3명 삽입 (비밀번호: "password123")
- [X] 테스트 할 일 10개 삽입
- [X] 데이터 삽입 확인 (`SELECT * FROM users;`)
- [X] 데이터 삽입 확인 (`SELECT * FROM todos;`)

**산출물:**
- 샘플 데이터 (users 3건, todos 10건)

**예상 시간:** 10분

**참고:** 이 Task는 선택 사항이며, API 테스트 시 수동으로 데이터를 생성해도 무방

---

## Phase 2: 백엔드 개발

**목표:** Express API 서버 구축 (인증 + Todo CRUD)
**예상 시간:** 6시간
**담당:** 백엔드 개발자
**의존성:** Phase 1 완료

---

### Task 2.1: 백엔드 디렉토리 구조 생성

**설명:** 백엔드 레이어별 디렉토리 및 기본 파일 생성

**완료 조건:**
- [X] `src/config/` 디렉토리 생성
- [X] `src/middleware/` 디렉토리 생성
- [X] `src/routes/` 디렉토리 생성
- [X] `src/controllers/` 디렉토리 생성
- [X] `src/services/` 디렉토리 생성
- [X] `src/repositories/` 디렉토리 생성
- [X] `src/types/` 디렉토리 생성
- [X] `src/utils/` 디렉토리 생성
- [X] `src/server.ts` 파일 생성 (Express 앱 진입점)

**산출물:**
- 백엔드 디렉토리 구조 (프로젝트 원칙 문서 6.1절 참조)

**예상 시간:** 10분

---

### Task 2.2: TypeScript 타입 정의

**설명:** User, Todo, API 요청/응답 타입 정의

**완료 조건:**
- [X] `src/types/user.types.ts` 파일 생성
  - [X] `User` 인터페이스 정의 (id, email, password_hash, created_at, updated_at)
  - [X] `RegisterDto` 인터페이스 정의 (email, password)
  - [X] `LoginDto` 인터페이스 정의 (email, password)
- [X] `src/types/todo.types.ts` 파일 생성
  - [X] `Todo` 인터페이스 정의 (id, user_id, title, description, due_date, is_completed, created_at, updated_at)
  - [X] `CreateTodoDto` 인터페이스 정의 (title, description?, due_date?)
  - [X] `UpdateTodoDto` 인터페이스 정의 (title?, description?, due_date?, is_completed?)
- [X] `src/types/api.types.ts` 파일 생성
  - [X] `ApiResponse<T>` 제네릭 타입 정의
  - [X] `ErrorResponse` 인터페이스 정의
  - [X] `AuthResponse` 인터페이스 정의 (token, user)

**산출물:**
- `src/types/user.types.ts`
- `src/types/todo.types.ts`
- `src/types/api.types.ts`

**예상 시간:** 20분

---

### Task 2.3: 유틸리티 함수 구현

**설명:** 비밀번호 해싱, JWT 생성/검증, 날짜 처리 유틸 함수 구현

**완료 조건:**
- [X] `src/utils/password.ts` 파일 생성
  - [X] `hashPassword(password: string): Promise<string>` 함수 구현 (bcrypt, 10 rounds)
  - [X] `comparePassword(password: string, hash: string): Promise<boolean>` 함수 구현
- [X] `src/utils/jwt.ts` 파일 생성
  - [X] `generateToken(userId: number, email: string): string` 함수 구현
  - [X] `verifyToken(token: string): { userId: number; email: string }` 함수 구현
  - [X] 환경 변수 `JWT_SECRET` 사용
- [X] `src/utils/date.ts` 파일 생성
  - [X] `isOverdue(dueDate: string | null, isCompleted: boolean): boolean` 함수 구현 (BR-009)
  - [X] `formatDate(date: Date): string` 함수 구현 (YYYY-MM-DD)

**산출물:**
- `src/utils/password.ts`
- `src/utils/jwt.ts`
- `src/utils/date.ts`

**예상 시간:** 30분

---

### Task 2.4: Repository 계층 구현

**설명:** 데이터베이스 접근 계층 구현 (UserRepository, TodoRepository)

**완료 조건:**
- [X] `src/repositories/user.repository.ts` 파일 생성
  - [X] `findByEmail(email: string): Promise<User | null>` 메서드 구현
  - [X] `create(email: string, passwordHash: string): Promise<User>` 메서드 구현
  - [X] 파라미터화된 쿼리 사용 (SQL Injection 방어)
- [X] `src/repositories/todo.repository.ts` 파일 생성
  - [X] `findByUserId(userId: number): Promise<Todo[]>` 메서드 구현
  - [X] `findById(id: number): Promise<Todo | null>` 메서드 구현
  - [X] `create(userId: number, data: CreateTodoDto): Promise<Todo>` 메서드 구현
  - [X] `update(id: number, userId: number, data: UpdateTodoDto): Promise<Todo | null>` 메서드 구현
  - [X] `delete(id: number, userId: number): Promise<boolean>` 메서드 구현
  - [X] 모든 쿼리에 `user_id` 필터 적용 (BR-003: 소유권 기반 접근)

**산출물:**
- `src/repositories/user.repository.ts`
- `src/repositories/todo.repository.ts`

**예상 시간:** 1시간

---

### Task 2.5: Service 계층 구현

**설명:** 비즈니스 로직 계층 구현 (AuthService, TodoService)

**완료 조건:**
- [X] `src/services/auth.service.ts` 파일 생성
  - [X] `register(email: string, password: string): Promise<void>` 메서드 구현
    - [X] 이메일 중복 확인
    - [X] 비밀번호 해싱
    - [X] UserRepository.create 호출
  - [X] `login(email: string, password: string): Promise<{ token: string; user: User }>` 메서드 구현
    - [X] 사용자 조회
    - [X] 비밀번호 검증
    - [X] JWT 토큰 생성
- [X] `src/services/todo.service.ts` 파일 생성
  - [X] `getTodosByUser(userId: number): Promise<Todo[]>` 메서드 구현
    - [X] TodoRepository.findByUserId 호출
    - [X] BR-012: 기본 정렬 우선순위 적용 (Overdue > 마감일 빠른 순 > 생성일 빠른 순)
  - [X] `createTodo(userId: number, data: CreateTodoDto): Promise<Todo>` 메서드 구현
    - [X] 제목 검증 (빈 값 체크)
    - [X] TodoRepository.create 호출
  - [X] `updateTodo(id: number, userId: number, data: UpdateTodoDto): Promise<Todo>` 메서드 구현
    - [X] 소유권 검증
    - [X] TodoRepository.update 호출
  - [X] `deleteTodo(id: number, userId: number): Promise<boolean>` 메서드 구현
    - [X] 소유권 검증
    - [X] TodoRepository.delete 호출

**산출물:**
- `src/services/auth.service.ts`
- `src/services/todo.service.ts`

**예상 시간:** 1.5시간

---

### Task 2.6: Middleware 구현

**설명:** JWT 인증, 에러 핸들러, 입력 검증 미들웨어 구현

**완료 조건:**
- [X] `src/middleware/auth.ts` 파일 생성
  - [X] `authMiddleware` 함수 구현
  - [X] `Authorization: Bearer {token}` 헤더 파싱
  - [X] JWT 검증 (utils/jwt.ts 사용)
  - [X] `req.user` 객체 설정 (userId, email)
  - [X] 인증 실패 시 401 Unauthorized 응답
- [X] `src/middleware/error-handler.ts` 파일 생성
  - [X] 전역 에러 핸들러 미들웨어 구현
  - [X] 에러 타입별 적절한 HTTP 상태 코드 반환
  - [X] 에러 로깅 (console.error)
  - [X] 프로덕션 환경에서 스택 트레이스 숨김
- [X] `src/middleware/validator.ts` 파일 생성
  - [X] `validateRegister` 미들웨어 구현 (이메일 형식, 비밀번호 8자 이상)
  - [X] `validateLogin` 미들웨어 구현
  - [X] `validateCreateTodo` 미들웨어 구현 (title 필수)

**산출물:**
- `src/middleware/auth.ts`
- `src/middleware/error-handler.ts`
- `src/middleware/validator.ts`

**예상 시간:** 45분

---

### Task 2.7: Controller 계층 구현

**설명:** HTTP 요청 처리 계층 구현 (AuthController, TodoController)

**완료 조건:**
- [X] `src/controllers/auth.controller.ts` 파일 생성
  - [X] `register` 핸들러 구현 (POST /api/auth/register)
    - [X] 요청 body 파싱 (email, password)
    - [X] AuthService.register 호출
    - [X] 201 Created 응답
    - [X] 에러 처리 (중복 이메일 → 400, 유효성 실패 → 422)
  - [X] `login` 핸들러 구현 (POST /api/auth/login)
    - [X] 요청 body 파싱 (email, password)
    - [X] AuthService.login 호출
    - [X] 200 OK 응답 (token, user)
    - [X] 에러 처리 (인증 실패 → 401)
- [X] `src/controllers/todo.controller.ts` 파일 생성
  - [X] `getTodos` 핸들러 구현 (GET /api/todos)
    - [X] `req.user.id` 추출 (authMiddleware에서 설정)
    - [X] TodoService.getTodosByUser 호출
    - [X] 200 OK 응답 (todos 배열)
  - [X] `createTodo` 핸들러 구현 (POST /api/todos)
    - [X] 요청 body 파싱 (title, description, due_date)
    - [X] TodoService.createTodo 호출
    - [X] 201 Created 응답
  - [X] `updateTodo` 핸들러 구현 (PUT /api/todos/:id)
    - [X] URL 파라미터 `id` 파싱
    - [X] 요청 body 파싱
    - [X] TodoService.updateTodo 호출
    - [X] 200 OK 응답
    - [X] 에러 처리 (소유권 없음 → 403, 없는 Todo → 404)
  - [X] `deleteTodo` 핸들러 구현 (DELETE /api/todos/:id)
    - [X] URL 파라미터 `id` 파싱
    - [X] TodoService.deleteTodo 호출
    - [X] 200 OK 응답
    - [X] 에러 처리 (소유권 없음 → 403, 없는 Todo → 404)

**산출물:**
- `src/controllers/auth.controller.ts`
- `src/controllers/todo.controller.ts`

**예상 시간:** 1시간

---

### Task 2.8: Routes 정의

**설명:** API 엔드포인트 라우트 정의

**완료 조건:**
- [X] `src/routes/auth.routes.ts` 파일 생성
  - [X] `POST /api/auth/register` 라우트 정의 (validateRegister → AuthController.register)
  - [X] `POST /api/auth/login` 라우트 정의 (validateLogin → AuthController.login)
- [X] `src/routes/todo.routes.ts` 파일 생성
  - [X] `GET /api/todos` 라우트 정의 (authMiddleware → TodoController.getTodos)
  - [X] `POST /api/todos` 라우트 정의 (authMiddleware → validateCreateTodo → TodoController.createTodo)
  - [X] `PUT /api/todos/:id` 라우트 정의 (authMiddleware → TodoController.updateTodo)
  - [X] `DELETE /api/todos/:id` 라우트 정의 (authMiddleware → TodoController.deleteTodo)

**산출물:**
- `src/routes/auth.routes.ts`
- `src/routes/todo.routes.ts`

**예상 시간:** 20분

---

### Task 2.9: Express 서버 설정

**설명:** Express 앱 초기화 및 미들웨어, 라우트 통합

**완료 조건:**
- [X] `src/server.ts` 파일 구현
  - [X] Express 앱 생성
  - [X] CORS 미들웨어 설정
  - [X] `express.json()` 미들웨어 설정 (body parser)
  - [X] `/api/auth` 라우트 등록
  - [X] `/api/todos` 라우트 등록
  - [X] 전역 에러 핸들러 등록
  - [X] 서버 포트 설정 (환경 변수 `PORT` 또는 기본 3001)
  - [X] 서버 시작 (`app.listen`)
- [X] `.env.example` 업데이트
  - [X] `DATABASE_URL` 추가
  - [X] `JWT_SECRET` 추가
  - [X] `PORT` 추가
  - [X] `NODE_ENV` 추가

**산출물:**
- `src/server.ts`
- `.env.example` (업데이트)

**예상 시간:** 30분

---

### Task 2.10: 백엔드 API 테스트

**설명:** Postman으로 모든 API 엔드포인트 수동 테스트

**완료 조건:**
- [X] 서버 실행 (`npm run dev`)
- [X] **회원가입 API 테스트**
  - [X] 정상 가입 성공 (201)
  - [X] 중복 이메일 실패 (400)
  - [X] 잘못된 이메일 형식 실패 (422)
  - [X] 비밀번호 8자 미만 실패 (422)
- [X] **로그인 API 테스트**
  - [X] 정상 로그인 성공 (200, token 반환)
  - [X] 잘못된 비밀번호 실패 (401)
  - [X] 존재하지 않는 이메일 실패 (401)
- [X] **할 일 생성 API 테스트**
  - [X] 정상 생성 성공 (201)
  - [X] 인증 없이 요청 실패 (401)
  - [X] 제목 없이 생성 실패 (400)
- [X] **할 일 조회 API 테스트**
  - [X] 정상 조회 성공 (200, 본인 할 일만 반환)
  - [X] 인증 없이 요청 실패 (401)
- [X] **할 일 수정 API 테스트**
  - [X] 정상 수정 성공 (200)
  - [X] 다른 사용자의 할 일 수정 실패 (403)
  - [X] 존재하지 않는 할 일 수정 실패 (404)
- [X] **할 일 삭제 API 테스트**
  - [X] 정상 삭제 성공 (200)
  - [X] 다른 사용자의 할 일 삭제 실패 (403)
  - [X] 존재하지 않는 할 일 삭제 실패 (404)

**산출물:**
- Postman 테스트 결과 스크린샷 (선택)

**예상 시간:** 1시간

---

## Phase 3: 프론트엔드 개발

**목표:** React 프론트엔드 UI 개발 (회원가입, 로그인, 할 일 관리)
**예상 시간:** 8시간
**담당:** 프론트엔드 개발자
**의존성:** Phase 2 완료 (백엔드 API 사용 가능)

---

### Task 3.1: 프론트엔드 디렉토리 구조 생성

**설명:** React 프로젝트 디렉토리 및 기본 파일 생성

**완료 조건:**
- [ ] `src/components/` 디렉토리 생성
  - [ ] `src/components/common/` 서브디렉토리 생성
  - [ ] `src/components/todo/` 서브디렉토리 생성
  - [ ] `src/components/auth/` 서브디렉토리 생성
- [ ] `src/pages/` 디렉토리 생성
- [ ] `src/hooks/` 디렉토리 생성
- [ ] `src/services/` 디렉토리 생성
- [ ] `src/context/` 디렉토리 생성
- [ ] `src/types/` 디렉토리 생성
- [ ] `src/utils/` 디렉토리 생성
- [ ] `src/styles/` 디렉토리 생성

**산출물:**
- 프론트엔드 디렉토리 구조 (프로젝트 원칙 문서 6.2절 참조)

**예상 시간:** 10분

---

### Task 3.2: TypeScript 타입 정의

**설명:** 프론트엔드 타입 정의 (백엔드와 일치)

**완료 조건:**
- [ ] `src/types/user.types.ts` 파일 생성
  - [ ] `User` 인터페이스 정의
  - [ ] `LoginDto` 인터페이스 정의
  - [ ] `RegisterDto` 인터페이스 정의
- [ ] `src/types/todo.types.ts` 파일 생성
  - [ ] `Todo` 인터페이스 정의
  - [ ] `CreateTodoDto` 인터페이스 정의
  - [ ] `UpdateTodoDto` 인터페이스 정의
- [ ] `src/types/api.types.ts` 파일 생성
  - [ ] `AuthResponse` 인터페이스 정의 (token, user)
  - [ ] `TodosResponse` 인터페이스 정의 (todos 배열)
  - [ ] `ErrorResponse` 인터페이스 정의

**산출물:**
- `src/types/user.types.ts`
- `src/types/todo.types.ts`
- `src/types/api.types.ts`

**예상 시간:** 15분

---

### Task 3.3: API 클라이언트 설정

**설명:** axios 또는 fetch API를 사용한 HTTP 클라이언트 설정

**완료 조건:**
- [ ] `src/services/api.ts` 파일 생성
  - [ ] `API_BASE_URL` 환경 변수 사용 (`REACT_APP_API_URL`)
  - [ ] 기본 헤더 설정 (`Content-Type: application/json`)
  - [ ] JWT 토큰 자동 포함 (`Authorization: Bearer {token}`)
  - [ ] 401 응답 시 로그아웃 처리 (토큰 만료)
  - [ ] 에러 응답 처리
- [ ] `.env.example` 파일 생성
  - [ ] `REACT_APP_API_URL=http://localhost:3001/api` 추가

**산출물:**
- `src/services/api.ts`
- `.env.example`

**예상 시간:** 30분

---

### Task 3.4: Auth Service 구현

**설명:** 인증 관련 API 호출 함수 구현

**완료 조건:**
- [ ] `src/services/auth.service.ts` 파일 생성
  - [ ] `register(email: string, password: string): Promise<void>` 함수 구현
    - [ ] `POST /api/auth/register` 호출
    - [ ] 성공 시 resolve, 실패 시 reject
  - [ ] `login(email: string, password: string): Promise<AuthResponse>` 함수 구현
    - [ ] `POST /api/auth/login` 호출
    - [ ] 성공 시 { token, user } 반환
    - [ ] 토큰을 localStorage에 저장
  - [ ] `logout(): void` 함수 구현
    - [ ] localStorage에서 토큰 삭제
  - [ ] `getToken(): string | null` 함수 구현
    - [ ] localStorage에서 토큰 조회

**산출물:**
- `src/services/auth.service.ts`

**예상 시간:** 30분

---

### Task 3.5: Todo Service 구현

**설명:** 할 일 관련 API 호출 함수 구현

**완료 조건:**
- [ ] `src/services/todo.service.ts` 파일 생성
  - [ ] `getTodos(): Promise<Todo[]>` 함수 구현 (GET /api/todos)
  - [ ] `createTodo(data: CreateTodoDto): Promise<Todo>` 함수 구현 (POST /api/todos)
  - [ ] `updateTodo(id: number, data: UpdateTodoDto): Promise<Todo>` 함수 구현 (PUT /api/todos/:id)
  - [ ] `deleteTodo(id: number): Promise<void>` 함수 구현 (DELETE /api/todos/:id)

**산출물:**
- `src/services/todo.service.ts`

**예상 시간:** 30분

---

### Task 3.6: AuthContext 구현

**설명:** 인증 상태 전역 관리를 위한 React Context 구현

**완료 조건:**
- [ ] `src/context/AuthContext.tsx` 파일 생성
  - [ ] `AuthContext` 생성
  - [ ] `AuthProvider` 컴포넌트 구현
  - [ ] 상태: `user`, `token`, `isAuthenticated`, `isLoading`
  - [ ] 함수: `login`, `logout`, `register`
  - [ ] 초기 로드 시 localStorage에서 토큰 복원
  - [ ] `useAuth` 커스텀 훅 구현
- [ ] `src/App.tsx`에 `AuthProvider` 적용

**산출물:**
- `src/context/AuthContext.tsx`

**예상 시간:** 45분

---

### Task 3.7: Custom Hooks 구현

**설명:** useTodos, useApi 커스텀 훅 구현

**완료 조건:**
- [ ] `src/hooks/useTodos.ts` 파일 생성
  - [ ] `useTodos()` 훅 구현
  - [ ] 상태: `todos`, `loading`, `error`
  - [ ] 함수: `fetchTodos`, `createTodo`, `updateTodo`, `deleteTodo`, `toggleComplete`
  - [ ] 자동으로 fetchTodos 실행 (useEffect)
- [ ] `src/hooks/useApi.ts` 파일 생성 (선택)
  - [ ] API 호출 로직 공통화 (loading, error 상태 관리)

**산출물:**
- `src/hooks/useTodos.ts`
- `src/hooks/useApi.ts` (선택)

**예상 시간:** 1시간

---

### Task 3.8: 공통 컴포넌트 구현

**설명:** Button, Input, Modal 등 재사용 가능한 공통 컴포넌트 구현

**완료 조건:**
- [ ] `src/components/common/Button.tsx` 파일 생성
  - [ ] Props: `children`, `onClick`, `type`, `disabled`, `variant`
  - [ ] 스타일링 (primary, secondary, danger)
- [ ] `src/components/common/Input.tsx` 파일 생성
  - [ ] Props: `type`, `value`, `onChange`, `placeholder`, `label`, `error`
  - [ ] 에러 메시지 표시 기능
- [ ] `src/components/common/Modal.tsx` 파일 생성
  - [ ] Props: `isOpen`, `onClose`, `title`, `children`
  - [ ] 배경 클릭 시 닫기
  - [ ] ESC 키로 닫기

**산출물:**
- `src/components/common/Button.tsx`
- `src/components/common/Input.tsx`
- `src/components/common/Modal.tsx`

**예상 시간:** 1시간

---

### Task 3.9: 회원가입/로그인 컴포넌트 구현

**설명:** RegisterForm, LoginForm 컴포넌트 구현

**완료 조건:**
- [ ] `src/components/auth/RegisterForm.tsx` 파일 생성
  - [ ] 이메일 입력 필드
  - [ ] 비밀번호 입력 필드
  - [ ] 가입 버튼
  - [ ] 입력 검증 (이메일 형식, 비밀번호 8자 이상)
  - [ ] 에러 메시지 표시
  - [ ] useAuth 훅 사용
  - [ ] 가입 성공 시 로그인 페이지로 리다이렉트
- [ ] `src/components/auth/LoginForm.tsx` 파일 생성
  - [ ] 이메일 입력 필드
  - [ ] 비밀번호 입력 필드
  - [ ] 로그인 버튼
  - [ ] 에러 메시지 표시
  - [ ] useAuth 훅 사용
  - [ ] 로그인 성공 시 /todos로 리다이렉트

**산출물:**
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/LoginForm.tsx`

**예상 시간:** 1.5시간

---

### Task 3.10: 회원가입/로그인 페이지 구현

**설명:** RegisterPage, LoginPage 페이지 컴포넌트 구현

**완료 조건:**
- [ ] `src/pages/RegisterPage.tsx` 파일 생성
  - [ ] RegisterForm 컴포넌트 포함
  - [ ] "이미 계정이 있으신가요? 로그인" 링크 포함
  - [ ] 간단한 레이아웃 및 스타일링
- [ ] `src/pages/LoginPage.tsx` 파일 생성
  - [ ] LoginForm 컴포넌트 포함
  - [ ] "계정이 없으신가요? 회원가입" 링크 포함
  - [ ] 간단한 레이아웃 및 스타일링
- [ ] 이미 로그인한 사용자가 접근 시 /todos로 리다이렉트

**산출물:**
- `src/pages/RegisterPage.tsx`
- `src/pages/LoginPage.tsx`

**예상 시간:** 30분

---

### Task 3.11: Todo 컴포넌트 구현

**설명:** TodoItem, TodoList, TodoForm 컴포넌트 구현

**완료 조건:**
- [ ] `src/components/todo/TodoItem.tsx` 파일 생성
  - [ ] Props: `todo`, `onToggle`, `onDelete`, `onEdit`
  - [ ] 완료 체크박스
  - [ ] 제목, 설명, 마감일 표시
  - [ ] 편집 버튼, 삭제 버튼
  - [ ] 완료된 할 일: 취소선, 회색 처리
  - [ ] 기한 경과 할 일: 빨간색 강조
- [ ] `src/components/todo/TodoList.tsx` 파일 생성
  - [ ] Props: `todos`, `onToggle`, `onDelete`, `onEdit`
  - [ ] 할 일 목록 렌더링 (TodoItem 사용)
  - [ ] 할 일 없을 때 "할 일이 없습니다" 메시지
- [ ] `src/components/todo/TodoForm.tsx` 파일 생성
  - [ ] Props: `onSubmit`
  - [ ] 제목 입력 필드
  - [ ] 설명 입력 필드 (textarea)
  - [ ] 마감일 입력 필드 (date picker)
  - [ ] 추가 버튼
  - [ ] 입력 검증 (제목 필수)
  - [ ] 제출 후 폼 초기화

**산출물:**
- `src/components/todo/TodoItem.tsx`
- `src/components/todo/TodoList.tsx`
- `src/components/todo/TodoForm.tsx`

**예상 시간:** 2시간

---

### Task 3.12: 할 일 목록 페이지 구현

**설명:** TodoListPage 페이지 컴포넌트 구현 (메인 페이지)

**완료 조건:**
- [ ] `src/pages/TodoListPage.tsx` 파일 생성
  - [ ] 헤더 영역
    - [ ] 앱 제목 표시
    - [ ] 사용자 이메일 표시
    - [ ] 로그아웃 버튼
  - [ ] TodoForm 컴포넌트 포함 (할 일 추가)
  - [ ] 미완료 할 일 목록 (TodoList 컴포넌트)
    - [ ] 기한 경과 섹션 (빨간색)
    - [ ] 오늘 할 일 섹션 (주황색)
    - [ ] 예정된 할 일 섹션
    - [ ] 마감일 없는 할 일 섹션
  - [ ] 완료된 할 일 섹션
    - [ ] 접기/펼치기 토글 버튼
    - [ ] 완료된 TodoList 컴포넌트
  - [ ] useTodos 훅 사용
  - [ ] useAuth 훅 사용
  - [ ] 인증되지 않은 사용자 접근 시 로그인 페이지로 리다이렉트

**산출물:**
- `src/pages/TodoListPage.tsx`

**예상 시간:** 1.5시간

---

### Task 3.13: 라우팅 설정

**설명:** React Router 설정 및 페이지 라우트 정의

**완료 조건:**
- [ ] `src/App.tsx` 파일 수정
  - [ ] React Router BrowserRouter 설정
  - [ ] Routes 정의
    - [ ] `/login` → LoginPage
    - [ ] `/register` → RegisterPage
    - [ ] `/todos` → TodoListPage (Protected)
    - [ ] `/` → /todos로 리다이렉트 (로그인 시) 또는 /login으로 리다이렉트 (미로그인 시)
  - [ ] ProtectedRoute 컴포넌트 구현 (인증 필요)
    - [ ] 로그인되지 않은 경우 /login으로 리다이렉트

**산출물:**
- `src/App.tsx` (업데이트)

**예상 시간:** 30분

---

### Task 3.14: 스타일링 및 반응형 디자인

**설명:** CSS 스타일링 및 모바일/데스크탑 반응형 디자인 구현

**완료 조건:**
- [ ] `src/styles/global.css` 파일 생성
  - [ ] 전역 스타일 정의 (리셋, 폰트, 기본 색상)
  - [ ] CSS 변수 정의 (Primary, Success, Warning, Danger, Gray 색상)
- [ ] `src/styles/variables.css` 파일 생성 (선택)
  - [ ] 색상, 간격, 폰트 크기 변수 정의
- [ ] 컴포넌트별 CSS 모듈 또는 인라인 스타일 적용
  - [ ] TodoItem 스타일링 (카드 형태)
  - [ ] TodoForm 스타일링
  - [ ] 버튼 스타일링 (Primary, Danger)
  - [ ] 입력 필드 스타일링
- [ ] 반응형 디자인 구현
  - [ ] 모바일 (320px ~ 767px)
  - [ ] 태블릿 (768px ~ 1023px)
  - [ ] 데스크탑 (1024px 이상)
  - [ ] 터치 타겟 최소 44x44px

**산출물:**
- `src/styles/global.css`
- `src/styles/variables.css` (선택)
- 각 컴포넌트 CSS 파일

**예상 시간:** 2시간

---

## Phase 4: 통합 및 테스트

**목표:** 프론트엔드와 백엔드 통합, E2E 테스트, 인수 기준 검증
**예상 시간:** 4시간
**담당:** 풀스택 개발자
**의존성:** Phase 2, Phase 3 완료

---

### Task 4.1: 프론트엔드-백엔드 통합 테스트

**설명:** 로컬 환경에서 프론트엔드와 백엔드 동시 실행 및 통합 테스트

**완료 조건:**
- [ ] 백엔드 서버 실행 (`cd backend && npm run dev`)
- [ ] 프론트엔드 서버 실행 (`cd frontend && npm start`)
- [ ] CORS 설정 확인 (프론트엔드 → 백엔드 요청 가능)
- [ ] 회원가입 플로우 테스트
  - [ ] 회원가입 성공 → 로그인 페이지로 이동
- [ ] 로그인 플로우 테스트
  - [ ] 로그인 성공 → JWT 토큰 저장 → /todos로 이동
- [ ] 할 일 생성 테스트
  - [ ] 제목만 입력 → 생성 성공
  - [ ] 제목 + 설명 + 마감일 → 생성 성공
  - [ ] 생성된 할 일 목록에 즉시 표시
- [ ] 할 일 조회 테스트
  - [ ] 본인 할 일만 조회됨
  - [ ] 정렬 순서 확인 (기한 경과 > 마감일 빠른 순)
- [ ] 할 일 수정 테스트
  - [ ] 제목, 설명, 마감일 수정 성공
- [ ] 할 일 삭제 테스트
  - [ ] 확인 대화상자 표시 → 삭제 성공
- [ ] 완료 처리 테스트
  - [ ] 체크박스 클릭 → 완료 전환 → 완료 섹션으로 이동
  - [ ] 다시 클릭 → 미완료 전환 → 미완료 섹션으로 이동
- [ ] 로그아웃 테스트
  - [ ] 로그아웃 → 토큰 삭제 → 로그인 페이지로 이동

**산출물:** 없음

**예상 시간:** 1.5시간

---

### Task 4.2: 비즈니스 규칙 검증

**설명:** 도메인 정의의 모든 비즈니스 규칙 검증

**완료 조건:**
- [ ] **BR-001: 회원 가입 개방** - 누구나 회원가입 가능 확인
- [ ] **BR-002: 인증 필수** - 인증 없이 /api/todos 접근 시 401 확인
- [ ] **BR-003: 소유권 기반 접근** - 다른 사용자의 할 일 접근 시 403 확인
- [ ] **BR-004: Todo 생성** - 제목 필수, 생성 시 Incomplete 상태 확인
- [ ] **BR-005: Todo 수정** - 제목, 설명, 마감일 수정 가능 확인
- [ ] **BR-006: Todo 삭제** - 삭제된 Todo 복구 불가 확인
- [ ] **BR-007: 완료 처리** - Incomplete ↔ Completed 전환 확인
- [ ] **BR-008: 마감일 선택성** - 마감일 없이 Todo 생성 가능 확인
- [ ] **BR-009: 기한 경과 판단** - 마감일 < 오늘 AND 미완료 → Overdue 확인
- [ ] **BR-010: 마감일 해상도** - 날짜 단위(YYYY-MM-DD)로만 관리 확인
- [ ] **BR-012: 기본 정렬 우선순위** - Overdue > 마감일 빠른 순 > 생성일 빠른 순 확인
- [ ] **BR-013: 완료 Todo 분리 표시** - 완료된 할 일 별도 섹션 표시 확인

**산출물:** 없음

**예상 시간:** 1시간

---

### Task 4.3: 인수 기준 검증 (Acceptance Criteria)

**설명:** PRD 문서의 모든 인수 기준 체크리스트 검증

**완료 조건:**
- [ ] **FR-001: 회원가입 (AC-001-01 ~ AC-001-07)** - 7개 항목 검증
- [ ] **FR-002: 로그인 (AC-002-01 ~ AC-002-09)** - 9개 항목 검증
- [ ] **FR-003: 할 일 생성 (AC-003-01 ~ AC-003-11)** - 11개 항목 검증
- [ ] **FR-004: 할 일 조회 (AC-004-01 ~ AC-004-12)** - 12개 항목 검증
- [ ] **FR-005: 할 일 수정 (AC-005-01 ~ AC-005-09)** - 9개 항목 검증
- [ ] **FR-006: 할 일 삭제 (AC-006-01 ~ AC-006-10)** - 10개 항목 검증
- [ ] **FR-007: 할 일 완료 처리 (AC-007-01 ~ AC-007-11)** - 11개 항목 검증
- [ ] **FR-008: 기한 경과 자동 판단 (AC-008-01 ~ AC-008-09)** - 9개 항목 검증
- [ ] **비기능적 요구사항 (AC-NFR-001 ~ AC-NFR-032)** - 32개 항목 검증

**참고:** 상세 인수 기준은 PRD 문서 14장 참조

**산출물:**
- 인수 기준 체크리스트 (완료 표시)

**예상 시간:** 2시간

---

### Task 4.4: 보안 테스트

**설명:** 보안 취약점 검증

**완료 조건:**
- [ ] **SQL Injection 테스트**
  - [ ] 이메일 필드에 `' OR 1=1 --` 입력 → 방어 확인
  - [ ] Todo 제목에 SQL 쿼리 입력 → 방어 확인
- [ ] **XSS 테스트**
  - [ ] Todo 제목에 `<script>alert('XSS')</script>` 입력 → 이스케이프 확인
  - [ ] 설명에 HTML 태그 입력 → 이스케이프 확인
- [ ] **인증 우회 테스트**
  - [ ] JWT 토큰 없이 /api/todos 접근 → 401 확인
  - [ ] 만료된 JWT 토큰 사용 → 401 확인
  - [ ] 잘못된 JWT 토큰 사용 → 401 확인
- [ ] **권한 테스트**
  - [ ] 다른 사용자의 Todo 수정 시도 → 403 확인
  - [ ] 다른 사용자의 Todo 삭제 시도 → 403 확인
- [ ] **비밀번호 보안 테스트**
  - [ ] 데이터베이스에 평문 비밀번호 저장 안 됨 확인 (bcrypt 해시 확인)
  - [ ] JWT Secret 환경 변수로 관리 확인

**산출물:** 없음

**예상 시간:** 30분

---

### Task 4.5: 크로스 브라우저 테스트

**설명:** 주요 브라우저에서 정상 작동 확인

**완료 조건:**
- [ ] **Chrome 최신 버전** - 모든 기능 정상 작동 확인
- [ ] **Firefox 최신 버전** - 모든 기능 정상 작동 확인
- [ ] **Safari 최신 버전** (Mac) - 모든 기능 정상 작동 확인
- [ ] **Edge 최신 버전** - 모든 기능 정상 작동 확인
- [ ] **iOS Safari** (모바일) - 모든 기능 정상 작동 확인
- [ ] **Android Chrome** (모바일) - 모든 기능 정상 작동 확인

**산출물:** 없음

**예상 시간:** 30분

---

### Task 4.6: 반응형 디자인 테스트

**설명:** 다양한 화면 크기에서 정상 작동 확인

**완료 조건:**
- [ ] **모바일 (320px)** - 레이아웃 깨짐 없음, 모든 기능 사용 가능
- [ ] **모바일 (375px - iPhone)** - 레이아웃 정상, 터치 타겟 적절
- [ ] **태블릿 (768px)** - 레이아웃 정상
- [ ] **데스크탑 (1024px)** - 레이아웃 정상
- [ ] **대형 화면 (1920px)** - 레이아웃 정상, 과도한 여백 없음

**산출물:** 없음

**예상 시간:** 30분

---

## Phase 5: 배포

**목표:** Vercel에 프론트엔드 및 백엔드 배포
**예상 시간:** 2시간
**담당:** DevOps / 풀스택 개발자
**의존성:** Phase 4 완료 (모든 테스트 통과)

---

### Task 5.1: 백엔드 Vercel 배포 준비

**설명:** 백엔드 프로젝트 Vercel 배포 설정

**완료 조건:**
- [ ] `backend/vercel.json` 파일 생성
  - [ ] `version: 2` 설정
  - [ ] `builds` 설정 (`src/server.ts` → `@vercel/node`)
  - [ ] `routes` 설정 (`/api/*` → `server.ts`)
- [ ] `package.json` scripts 확인
  - [ ] `build` 스크립트 확인 (TypeScript 컴파일)
  - [ ] `start` 스크립트 확인
- [ ] `.vercelignore` 파일 생성
  - [ ] `node_modules/` 제외
  - [ ] `.env` 제외

**산출물:**
- `backend/vercel.json`
- `backend/.vercelignore`

**예상 시간:** 15분

---

### Task 5.2: 프론트엔드 Vercel 배포 준비

**설명:** 프론트엔드 프로젝트 Vercel 배포 설정

**완료 조건:**
- [ ] `frontend/vercel.json` 파일 생성 (선택)
  - [ ] SPA 라우팅 설정 (모든 요청을 index.html로)
- [ ] `package.json` scripts 확인
  - [ ] `build` 스크립트 확인 (`react-scripts build`)
- [ ] `.vercelignore` 파일 생성
  - [ ] `node_modules/` 제외

**산출물:**
- `frontend/vercel.json` (선택)
- `frontend/.vercelignore`

**예상 시간:** 10분

---

### Task 5.3: PostgreSQL 데이터베이스 준비

**설명:** 프로덕션 환경 PostgreSQL 데이터베이스 설정

**완료 조건:**
- [ ] 클라우드 PostgreSQL 서비스 선택 (예: Neon, Supabase, Heroku Postgres, Railway)
- [ ] 데이터베이스 인스턴스 생성
- [ ] `DATABASE_URL` 연결 문자열 복사
- [ ] `database/schema.sql` 파일을 프로덕션 DB에 실행
  - [ ] `psql {DATABASE_URL} -f database/schema.sql` 실행
- [ ] 테이블 생성 확인
- [ ] 인덱스 및 트리거 생성 확인

**산출물:**
- 프로덕션 PostgreSQL 데이터베이스
- `DATABASE_URL` (환경 변수 설정 준비)

**예상 시간:** 30분

---

### Task 5.4: 백엔드 Vercel 배포

**설명:** 백엔드 API 서버 Vercel 배포

**완료 조건:**
- [ ] Vercel 계정 생성 (vercel.com)
- [ ] Vercel CLI 설치 (`npm install -g vercel`)
- [ ] `cd backend && vercel` 실행 (첫 배포)
- [ ] 프로젝트 설정
  - [ ] 프로젝트명 설정
  - [ ] Framework Preset: `Other`
  - [ ] Root Directory: `backend/`
- [ ] Vercel 대시보드에서 환경 변수 설정
  - [ ] `DATABASE_URL` 설정 (프로덕션 PostgreSQL URL)
  - [ ] `JWT_SECRET` 설정 (최소 32자 랜덤 문자열)
  - [ ] `NODE_ENV=production` 설정
- [ ] 재배포 (`vercel --prod`)
- [ ] 배포 URL 확인 (예: `https://todolist-backend.vercel.app`)
- [ ] API 엔드포인트 테스트
  - [ ] `GET {BACKEND_URL}/api/todos` → 401 확인 (인증 필요)
  - [ ] `POST {BACKEND_URL}/api/auth/register` → 201 확인

**산출물:**
- 배포된 백엔드 URL

**예상 시간:** 30분

---

### Task 5.5: 프론트엔드 Vercel 배포

**설명:** React 프론트엔드 Vercel 배포

**완료 조건:**
- [ ] `cd frontend && vercel` 실행 (첫 배포)
- [ ] 프로젝트 설정
  - [ ] 프로젝트명 설정
  - [ ] Framework Preset: `Create React App`
  - [ ] Root Directory: `frontend/`
- [ ] Vercel 대시보드에서 환경 변수 설정
  - [ ] `REACT_APP_API_URL` 설정 (백엔드 배포 URL, 예: `https://todolist-backend.vercel.app/api`)
- [ ] 재배포 (`vercel --prod`)
- [ ] 배포 URL 확인 (예: `https://todolist-frontend.vercel.app`)
- [ ] HTTPS 자동 적용 확인

**산출물:**
- 배포된 프론트엔드 URL

**예상 시간:** 20분

---

### Task 5.6: 프로덕션 환경 E2E 테스트

**설명:** 배포된 프로덕션 환경에서 전체 플로우 테스트

**완료 조건:**
- [ ] 프론트엔드 URL 접속 (HTTPS 확인)
- [ ] 회원가입 플로우 테스트
  - [ ] 새 계정 생성 성공
- [ ] 로그인 플로우 테스트
  - [ ] 로그인 성공, JWT 토큰 저장
- [ ] 할 일 생성 테스트
  - [ ] 제목 + 마감일 할 일 생성
- [ ] 할 일 조회 테스트
  - [ ] 생성된 할 일 목록에 표시
  - [ ] 정렬 순서 확인
- [ ] 할 일 수정 테스트
  - [ ] 제목 수정 성공
- [ ] 할 일 완료 처리 테스트
  - [ ] 체크박스 클릭 → 완료 섹션 이동
- [ ] 할 일 삭제 테스트
  - [ ] 삭제 성공
- [ ] 로그아웃 테스트
  - [ ] 로그아웃 → 로그인 페이지 이동
- [ ] 모바일 환경 테스트
  - [ ] 모바일 브라우저에서 모든 기능 정상 작동

**산출물:** 없음

**예상 시간:** 30분

---

### Task 5.7: 성능 테스트

**설명:** 프로덕션 환경에서 성능 기준 충족 확인

**완료 조건:**
- [ ] 할 일 목록 로딩 시간 측정 (목표: 2초 이내)
- [ ] 할 일 생성 응답 시간 측정 (목표: 1초 이내)
- [ ] 페이지 전환 시간 측정 (목표: 1초 이내)
- [ ] Chrome DevTools Lighthouse 실행
  - [ ] Performance 점수 70점 이상
  - [ ] Accessibility 점수 90점 이상
  - [ ] Best Practices 점수 90점 이상

**산출물:**
- Lighthouse 보고서 (선택)

**예상 시간:** 15분

---

### Task 5.8: 최종 점검 및 문서화

**설명:** 배포 완료 후 최종 점검 및 README 업데이트

**완료 조건:**
- [ ] 모든 인수 기준 충족 확인
- [ ] 보안 취약점 0건 확인
- [ ] 크리티컬 버그 0건 확인
- [ ] `README.md` 업데이트
  - [ ] 프로젝트 소개
  - [ ] 기능 목록
  - [ ] 기술 스택
  - [ ] 배포 URL 추가
  - [ ] 로컬 개발 환경 설정 가이드
  - [ ] 스크린샷 추가 (선택)
- [ ] 환경 변수 문서화 확인 (`.env.example` 파일)

**산출물:**
- 업데이트된 `README.md`

**예상 시간:** 20분

---

## 9. 일정 타임라인

### Day 1: 백엔드 및 데이터베이스 구축

**총 예상 시간:** 8시간

| 시간 | Phase | Task | 예상 소요 |
|------|-------|------|----------|
| 09:00 - 10:00 | Phase 0 | Task 0.1 ~ 0.4 (프로젝트 초기 설정) | 1시간 |
| 10:00 - 11:00 | Phase 1 | Task 1.1 ~ 1.4 (데이터베이스 구축) | 1시간 |
| 11:00 - 12:00 | Phase 2 | Task 2.1 ~ 2.3 (백엔드 구조 및 타입 정의) | 1시간 |
| 12:00 - 13:00 | 점심 휴식 | - | - |
| 13:00 - 14:00 | Phase 2 | Task 2.4 (Repository 계층) | 1시간 |
| 14:00 - 15:30 | Phase 2 | Task 2.5 (Service 계층) | 1.5시간 |
| 15:30 - 16:15 | Phase 2 | Task 2.6 (Middleware 구현) | 45분 |
| 16:15 - 17:15 | Phase 2 | Task 2.7 (Controller 계층) | 1시간 |
| 17:15 - 18:00 | Phase 2 | Task 2.8 ~ 2.9 (Routes, Express 서버) | 45분 |

**Day 1 마무리:**
- [ ] 백엔드 서버 실행 가능
- [ ] 데이터베이스 연결 확인
- [ ] 모든 API 엔드포인트 정의 완료

---

### Day 2: 백엔드 테스트 및 프론트엔드 개발

**총 예상 시간:** 8시간

| 시간 | Phase | Task | 예상 소요 |
|------|-------|------|----------|
| 09:00 - 10:00 | Phase 2 | Task 2.10 (백엔드 API 테스트) | 1시간 |
| 10:00 - 11:00 | Phase 3 | Task 3.1 ~ 3.5 (프론트엔드 구조 및 서비스) | 1시간 |
| 11:00 - 12:00 | Phase 3 | Task 3.6 ~ 3.7 (AuthContext, Hooks) | 1시간 |
| 12:00 - 13:00 | 점심 휴식 | - | - |
| 13:00 - 14:00 | Phase 3 | Task 3.8 (공통 컴포넌트) | 1시간 |
| 14:00 - 16:00 | Phase 3 | Task 3.9 ~ 3.10 (회원가입/로그인) | 2시간 |
| 16:00 - 18:00 | Phase 3 | Task 3.11 (Todo 컴포넌트) | 2시간 |

**Day 2 마무리:**
- [ ] 회원가입/로그인 페이지 완성
- [ ] Todo 컴포넌트 완성
- [ ] API 서비스 계층 완성

---

### Day 3: 프론트엔드 완성, 통합, 테스트, 배포

**총 예상 시간:** 8시간

| 시간 | Phase | Task | 예상 소요 |
|------|-------|------|----------|
| 09:00 - 10:30 | Phase 3 | Task 3.12 (할 일 목록 페이지) | 1.5시간 |
| 10:30 - 11:00 | Phase 3 | Task 3.13 (라우팅 설정) | 30분 |
| 11:00 - 12:00 | Phase 3 | Task 3.14 (스타일링 및 반응형) | 1시간 |
| 12:00 - 13:00 | 점심 휴식 | - | - |
| 13:00 - 14:30 | Phase 4 | Task 4.1 (통합 테스트) | 1.5시간 |
| 14:30 - 16:30 | Phase 4 | Task 4.2 ~ 4.6 (비즈니스 규칙, 인수 기준, 보안, 브라우저 테스트) | 2시간 |
| 16:30 - 18:00 | Phase 5 | Task 5.1 ~ 5.8 (Vercel 배포 및 최종 점검) | 1.5시간 |

**Day 3 마무리 (금요일 오후):**
- [ ] 모든 기능 완성
- [ ] 모든 테스트 통과
- [ ] Vercel 배포 완료
- [ ] MVP 출시 완료 🎉

---

## 10. 리스크 및 완화 방안

### 리스크 1: 타이트한 일정 (3일)

**영향도:** 높음
**발생 가능성:** 높음

**완화 방안:**
- ✅ MVP 범위를 엄격히 준수 (추가 기능 개발 금지)
- ✅ Day별 마일스톤 명확히 설정
- ✅ 블로킹 이슈 발생 시 즉시 해결 또는 우회
- ✅ 각 Task는 1-4시간 이내 완료 가능하도록 분해
- ✅ 병렬 작업 불가 (단일 개발자 가정)

---

### 리스크 2: 보안 취약점

**영향도:** 높음
**발생 가능성:** 중간

**완화 방안:**
- ✅ 입증된 라이브러리 사용 (bcrypt, jsonwebtoken, pg)
- ✅ SQL Injection 방어: 파라미터화된 쿼리 사용
- ✅ XSS 방어: 입력값 검증, 이스케이프 처리
- ✅ JWT Secret 환경 변수로 관리
- ✅ HTTPS 사용 (Vercel 자동 제공)
- ✅ Phase 4에서 보안 테스트 수행

---

### 리스크 3: 크로스 브라우저 호환성

**영향도:** 중간
**발생 가능성:** 중간

**완화 방안:**
- ✅ React 19의 브라우저 호환성 문서 확인
- ✅ 최신 브라우저 타겟 (큰 문제 없을 것으로 예상)
- ✅ Phase 4에서 크로스 브라우저 테스트 수행
- ✅ 필요 시 Polyfill 추가

---

### 리스크 4: 데이터베이스 성능 저하

**영향도:** 중간
**발생 가능성:** 낮음

**완화 방안:**
- ✅ 적절한 인덱스 사전 생성 (user_id, due_date, is_completed)
- ✅ 초기 사용자 100명 이하 (성능 문제 발생 가능성 낮음)
- ✅ N+1 쿼리 문제 발생하지 않도록 주의
- ✅ 향후 사용자 증가 시 쿼리 최적화 계획

---

### 리스크 5: Vercel 배포 실패

**영향도:** 높음
**발생 가능성:** 낮음

**완화 방안:**
- ✅ Vercel 문서에 따라 정확한 설정 수행
- ✅ 환경 변수 미리 준비 (DATABASE_URL, JWT_SECRET)
- ✅ 로컬에서 빌드 테스트 먼저 수행 (`npm run build`)
- ✅ Vercel CLI로 배포 전 프리뷰 배포 테스트

---

## 11. 참조 문서

- **도메인 정의서:** `docs/1-domain-definition.md`
- **PRD:** `docs/2-PRD.md`
- **사용자 시나리오:** `docs/3-user-scenario.md`
- **프로젝트 원칙:** `docs/4-project-principle.md`
- **아키텍처 다이어그램:** `docs/5-arch-diagram.md`
- **ERD:** `docs/6-ERD.md`
- **API 명세:** `swagger/swagger.json`

---

## 12. 체크리스트 요약

### Phase 0: 프로젝트 초기 설정 (1시간)
- [ ] Task 0.1: 개발 환경 준비
- [ ] Task 0.2: 프로젝트 디렉토리 구조 생성
- [ ] Task 0.3: 백엔드 프로젝트 초기화
- [ ] Task 0.4: 프론트엔드 프로젝트 초기화

### Phase 1: 데이터베이스 구축 (1시간)
- [ ] Task 1.1: PostgreSQL 데이터베이스 생성
- [ ] Task 1.2: 데이터베이스 스키마 생성
- [ ] Task 1.3: 데이터베이스 연결 테스트
- [ ] Task 1.4: 샘플 데이터 삽입 (선택)

### Phase 2: 백엔드 개발 (6시간)
- [ ] Task 2.1: 백엔드 디렉토리 구조 생성
- [ ] Task 2.2: TypeScript 타입 정의
- [ ] Task 2.3: 유틸리티 함수 구현
- [ ] Task 2.4: Repository 계층 구현
- [ ] Task 2.5: Service 계층 구현
- [ ] Task 2.6: Middleware 구현
- [ ] Task 2.7: Controller 계층 구현
- [ ] Task 2.8: Routes 정의
- [ ] Task 2.9: Express 서버 설정
- [ ] Task 2.10: 백엔드 API 테스트

### Phase 3: 프론트엔드 개발 (8시간)
- [ ] Task 3.1: 프론트엔드 디렉토리 구조 생성
- [ ] Task 3.2: TypeScript 타입 정의
- [ ] Task 3.3: API 클라이언트 설정
- [ ] Task 3.4: Auth Service 구현
- [ ] Task 3.5: Todo Service 구현
- [ ] Task 3.6: AuthContext 구현
- [ ] Task 3.7: Custom Hooks 구현
- [ ] Task 3.8: 공통 컴포넌트 구현
- [ ] Task 3.9: 회원가입/로그인 컴포넌트 구현
- [ ] Task 3.10: 회원가입/로그인 페이지 구현
- [ ] Task 3.11: Todo 컴포넌트 구현
- [ ] Task 3.12: 할 일 목록 페이지 구현
- [ ] Task 3.13: 라우팅 설정
- [ ] Task 3.14: 스타일링 및 반응형 디자인

### Phase 4: 통합 및 테스트 (4시간)
- [ ] Task 4.1: 프론트엔드-백엔드 통합 테스트
- [ ] Task 4.2: 비즈니스 규칙 검증
- [ ] Task 4.3: 인수 기준 검증
- [ ] Task 4.4: 보안 테스트
- [ ] Task 4.5: 크로스 브라우저 테스트
- [ ] Task 4.6: 반응형 디자인 테스트

### Phase 5: 배포 (2시간)
- [ ] Task 5.1: 백엔드 Vercel 배포 준비
- [ ] Task 5.2: 프론트엔드 Vercel 배포 준비
- [ ] Task 5.3: PostgreSQL 데이터베이스 준비
- [ ] Task 5.4: 백엔드 Vercel 배포
- [ ] Task 5.5: 프론트엔드 Vercel 배포
- [ ] Task 5.6: 프로덕션 환경 E2E 테스트
- [ ] Task 5.7: 성능 테스트
- [ ] Task 5.8: 최종 점검 및 문서화

---

## 13. 성공 기준

### MVP 출시 성공 조건

- ✅ **모든 Phase 완료** (Phase 0 ~ Phase 5)
- ✅ **모든 인수 기준 충족** (PRD 문서 14장)
- ✅ **보안 취약점 0건**
- ✅ **크리티컬 버그 0건**
- ✅ **Vercel 배포 성공** (프론트엔드 + 백엔드)
- ✅ **프로덕션 환경 테스트 통과**
- ✅ **금요일 오후까지 출시 완료**

---

**문서 종료**

**작성자:** Claude Code
**최종 업데이트:** 2026-02-11
**버전:** 2.0
