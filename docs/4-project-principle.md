# 프로젝트 구조 설계 원칙
# Personal Todo Management System

**문서 버전:** 1.0
**작성일:** 2026-02-11
**프로젝트:** 개인 할 일 관리 시스템 MVP

---

## 1. 최상위 설계 원칙 (Core Principles)

### 1.1 KISS (Keep It Simple, Stupid)
- **단순함이 최우선이다**
- 복잡한 추상화나 패턴은 명확한 필요성이 있을 때만 도입
- 3일 개발 기간 내 완성을 목표로 하므로 불필요한 복잡도는 제거
- 코드는 읽기 쉽고 이해하기 쉬워야 함

### 1.2 YAGNI (You Aren't Gonna Need It)
- **필요하지 않은 기능은 구현하지 않는다**
- MVP에 정의된 기능만 구현
- 향후 확장 가능성을 위한 과도한 설계 금지
- "나중에 필요할 수도" 있는 기능은 나중에 추가

### 1.3 DRY (Don't Repeat Yourself)
- **의미 있는 중복만 제거한다**
- 3번 이상 반복되는 로직만 함수/모듈로 추출
- 단순 코드 반복(2~3줄)은 무리하게 추상화하지 않음
- 조기 추상화(Premature Abstraction)를 경계

### 1.4 Fail Fast
- **오류는 빠르게 발견하고 명확하게 보고한다**
- 입력 검증은 가장 이른 시점에 수행
- 에러 메시지는 명확하고 구체적으로 작성
- 복구 불가능한 오류는 즉시 예외 발생

### 1.5 Secure by Default
- **보안은 선택이 아닌 기본이다**
- 모든 API는 기본적으로 인증 필요
- 사용자 입력은 항상 검증 및 이스케이프 처리
- 민감 정보는 절대 하드코딩 금지

---

## 2. 아키텍처 및 레이어 원칙 (Architecture & Layers)

### 2.1 3-Tier Architecture

```
┌─────────────────────────────────┐
│   Presentation Layer            │  ← React Frontend
│   (UI, User Interaction)        │
└─────────────────────────────────┘
           ↓ HTTP/REST
┌─────────────────────────────────┐
│   Business Logic Layer          │  ← Express Backend
│   (API, Authentication, Logic)  │
└─────────────────────────────────┘
           ↓ SQL
┌─────────────────────────────────┐
│   Data Layer                    │  ← PostgreSQL
│   (Database, Persistence)       │
└─────────────────────────────────┘
```

### 2.2 의존성 방향 원칙

**단방향 의존성 (Unidirectional Dependency)**
```
Presentation → Business Logic → Data Layer
```

- 상위 레이어는 하위 레이어에 의존 가능
- 하위 레이어는 상위 레이어를 알아서는 안 됨
- Data Layer는 Business Logic을 import하지 않음
- Business Logic은 Presentation을 import하지 않음

### 2.3 백엔드 레이어 구조

```
Routes (API Endpoints)
   ↓
Controllers (Request Handling)
   ↓
Services (Business Logic)
   ↓
Repositories (Data Access)
   ↓
Database (PostgreSQL)
```

**레이어별 책임:**
- **Routes:** URL 매핑, HTTP 메서드 정의
- **Controllers:** 요청 파싱, 응답 포맷팅, 에러 핸들링
- **Services:** 비즈니스 로직, 데이터 검증, 권한 확인
- **Repositories:** SQL 쿼리 실행, 데이터 변환
- **Database:** 데이터 저장 및 조회

### 2.4 프론트엔드 레이어 구조

```
Pages (Routes)
   ↓
Components (UI Elements)
   ↓
Hooks (State & Side Effects)
   ↓
Services (API Calls)
   ↓
API Client
```

**레이어별 책임:**
- **Pages:** 라우팅, 레이아웃 구성
- **Components:** UI 렌더링, 사용자 이벤트 처리
- **Hooks:** 상태 관리, 라이프사이클 관리
- **Services:** API 호출 로직
- **API Client:** HTTP 통신, 인증 헤더 관리

---

## 3. 코드 작성 및 네이밍 원칙 (Coding & Naming)

### 3.1 네이밍 컨벤션

**JavaScript/TypeScript:**
- **파일명:** kebab-case (`user-service.ts`, `todo-list.tsx`)
- **클래스/타입:** PascalCase (`TodoService`, `UserDto`)
- **함수/변수:** camelCase (`getUserById`, `todoList`)
- **상수:** UPPER_SNAKE_CASE (`JWT_SECRET`, `MAX_TITLE_LENGTH`)
- **컴포넌트:** PascalCase (`TodoList.tsx`, `LoginForm.tsx`)

**SQL:**
- **테이블명:** snake_case 복수형 (`users`, `todos`)
- **컬럼명:** snake_case (`user_id`, `created_at`)
- **인덱스명:** `idx_{table}_{column}` (`idx_todos_user_id`)

**API 엔드포인트:**
- **리소스:** 복수형 명사 (`/api/todos`, `/api/users`)
- **메서드:** RESTful 규칙 준수 (GET, POST, PUT, DELETE)

### 3.2 의미 있는 이름 사용

**좋은 예:**
```typescript
const incompleteTodos = todos.filter(todo => !todo.is_completed);
const isOverdue = todo.due_date < new Date();
```

**나쁜 예:**
```typescript
const arr = todos.filter(t => !t.c);
const flag = todo.d < new Date();
```

### 3.3 함수 작성 원칙

**단일 책임 원칙 (Single Responsibility Principle):**
```typescript
// 좋은 예: 하나의 명확한 책임
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// 나쁜 예: 너무 많은 책임
function registerUser(email: string, password: string) {
  // 이메일 검증
  // 비밀번호 해싱
  // DB 저장
  // 이메일 발송
  // 로그 기록
}
```

**함수 크기:**
- 한 함수는 최대 50줄을 넘지 않도록 권장
- 화면 스크롤 없이 한눈에 파악 가능한 크기 유지
- 복잡한 로직은 의미 있는 단위로 분리

**조기 반환 (Early Return):**
```typescript
// 좋은 예
function getTodo(id: number, userId: number) {
  if (!id) return null;
  if (!userId) throw new Error('Authentication required');

  const todo = await todoRepository.findById(id);
  if (!todo) return null;
  if (todo.user_id !== userId) throw new Error('Access denied');

  return todo;
}

// 나쁜 예
function getTodo(id: number, userId: number) {
  if (id) {
    if (userId) {
      const todo = await todoRepository.findById(id);
      if (todo) {
        if (todo.user_id === userId) {
          return todo;
        } else {
          throw new Error('Access denied');
        }
      } else {
        return null;
      }
    } else {
      throw new Error('Authentication required');
    }
  } else {
    return null;
  }
}
```

### 3.4 주석 작성 원칙

**주석이 필요한 경우:**
- 복잡한 비즈니스 로직의 의도 설명
- 비직관적인 해결 방법의 이유 설명
- 중요한 제약사항이나 주의사항

**주석이 불필요한 경우:**
- 코드만 봐도 명확한 내용
- 변수명/함수명이 이미 의미를 설명하는 경우

```typescript
// 좋은 예: 비즈니스 규칙 설명
// BR-009: 완료된 할 일은 마감일과 관계없이 기한 경과 아님
function isOverdue(todo: Todo): boolean {
  if (todo.is_completed) return false;
  if (!todo.due_date) return false;
  return new Date(todo.due_date) < new Date();
}

// 나쁜 예: 불필요한 주석
// 투두를 가져온다
function getTodo(id: number) {
  return todos.find(t => t.id === id);
}
```

### 3.5 타입 정의 원칙 (TypeScript)

**타입 우선 개발:**
- 모든 함수 파라미터와 반환 타입 명시
- `any` 타입 사용 금지 (정말 필요한 경우 `unknown` 사용)
- API 응답/요청은 인터페이스로 정의

```typescript
// 좋은 예
interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

async function getTodos(userId: number): Promise<Todo[]> {
  // ...
}

// 나쁜 예
function getTodos(userId) {
  // ...
}
```

---

## 4. 테스트 및 품질 원칙 (Testing & Quality)

### 4.1 테스트 전략

**MVP 단계 테스트 범위:**
- **필수:** 수동 E2E 테스트 (모든 인수 기준 검증)
- **권장:** 핵심 비즈니스 로직 단위 테스트
- **선택:** API 통합 테스트

**우선순위:**
1. 보안 관련 로직 (인증, 권한 검증)
2. 비즈니스 규칙 (기한 경과 판단, 정렬 로직)
3. 데이터 검증 로직

### 4.2 코드 품질 기준

**정적 분석:**
- TypeScript strict 모드 활성화
- ESLint 기본 규칙 적용
- 빌드 시 warning 0개 목표

**코드 리뷰 체크리스트:**
- [ ] 보안 취약점 없음 (SQL Injection, XSS)
- [ ] 에러 핸들링 적절히 구현
- [ ] 사용자별 데이터 격리 확인
- [ ] 환경 변수 하드코딩 없음
- [ ] 민감 정보 로그 출력 없음

### 4.3 오류 처리 원칙

**백엔드 오류 응답 형식:**
```typescript
// 일관된 에러 응답 구조
{
  "error": "명확하고 구체적인 오류 메시지"
}

// HTTP 상태 코드 규칙
// 400: 클라이언트 입력 오류
// 401: 인증 필요
// 403: 권한 없음
// 404: 리소스 없음
// 422: 유효성 검증 실패
// 500: 서버 내부 오류
```

**프론트엔드 오류 처리:**
```typescript
try {
  const response = await api.createTodo(data);
  // 성공 처리
} catch (error) {
  // 사용자에게 명확한 메시지 표시
  showError(error.message || '알 수 없는 오류가 발생했습니다');
}
```

---

## 5. 설정, 보안, 운영 원칙 (Configuration, Security, Operations)

### 5.1 환경 변수 관리

**원칙:**
- 모든 환경별 설정은 환경 변수로 관리
- 절대 코드에 하드코딩 금지
- `.env.example` 파일로 필수 변수 문서화
- `.env` 파일은 `.gitignore`에 포함

**백엔드 환경 변수:**
```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secret-key-min-32-chars
PORT=3001
NODE_ENV=production
```

**프론트엔드 환경 변수:**
```bash
REACT_APP_API_URL=https://api.example.com
```

### 5.2 보안 원칙

**인증 및 권한:**
- 모든 API 엔드포인트는 기본적으로 인증 필요 (/api/auth/* 제외)
- JWT 토큰은 요청 헤더 `Authorization: Bearer {token}`으로 전달
- 비밀번호는 bcrypt로 암호화 (최소 10 rounds)
- JWT Secret은 최소 32자 이상 랜덤 문자열

**입력 검증:**
- 클라이언트와 서버 양쪽에서 검증
- SQL 쿼리는 파라미터화된 쿼리 사용 (SQL Injection 방어)
- 사용자 입력 출력 시 이스케이프 처리 (XSS 방어)

**데이터 접근 제어:**
```typescript
// 모든 데이터 접근 시 사용자 검증
async function getTodos(userId: number): Promise<Todo[]> {
  return db.query(
    'SELECT * FROM todos WHERE user_id = $1',
    [userId]
  );
}

// 수정/삭제 시 소유권 검증
async function updateTodo(todoId: number, userId: number, data: UpdateTodoDto) {
  const todo = await db.query(
    'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
    [todoId, userId]
  );

  if (!todo) throw new Error('Access denied');

  // 수정 로직
}
```

### 5.3 로깅 원칙

**로그 레벨:**
- `error`: 즉시 대응 필요한 오류
- `warn`: 주의 필요한 상황
- `info`: 중요 비즈니스 이벤트
- `debug`: 개발 시에만 활성화

**로그 내용:**
- 요청 정보: HTTP 메서드, URL, 사용자 ID
- 응답 정보: 상태 코드, 처리 시간
- 오류 정보: 스택 트레이스, 에러 메시지

**금지 사항:**
- 비밀번호, JWT 토큰 등 민감 정보 로그 출력 금지
- 전체 요청 body 로그 금지 (민감 정보 포함 가능)

### 5.4 배포 원칙

**배포 전 체크리스트:**
- [ ] 모든 인수 기준 충족 확인
- [ ] 크리티컬 버그 0건
- [ ] 환경 변수 Vercel 대시보드에 설정
- [ ] 프로덕션 빌드 성공 확인
- [ ] HTTPS 적용 확인

**Vercel 배포 설정:**
- 자동 HTTPS 활성화
- 환경 변수 암호화 저장
- Build Command, Output Directory 명시

---

## 6. 디렉토리 구조 (Directory Structure)

### 6.1 백엔드 디렉토리 구조

```
backend/
├── src/
│   ├── config/              # 설정 파일
│   │   ├── database.ts      # DB 연결 설정
│   │   └── jwt.ts           # JWT 설정
│   │
│   ├── middleware/          # Express 미들웨어
│   │   ├── auth.ts          # JWT 인증 미들웨어
│   │   ├── error-handler.ts # 전역 에러 핸들러
│   │   └── validator.ts     # 입력 검증 미들웨어
│   │
│   ├── routes/              # API 라우트 정의
│   │   ├── auth.routes.ts   # /api/auth/*
│   │   └── todo.routes.ts   # /api/todos/*
│   │
│   ├── controllers/         # 요청 핸들러
│   │   ├── auth.controller.ts
│   │   └── todo.controller.ts
│   │
│   ├── services/            # 비즈니스 로직
│   │   ├── auth.service.ts
│   │   └── todo.service.ts
│   │
│   ├── repositories/        # 데이터 액세스 계층
│   │   ├── user.repository.ts
│   │   └── todo.repository.ts
│   │
│   ├── types/               # TypeScript 타입 정의
│   │   ├── user.types.ts
│   │   ├── todo.types.ts
│   │   └── api.types.ts
│   │
│   ├── utils/               # 유틸리티 함수
│   │   ├── password.ts      # 비밀번호 해싱/검증
│   │   ├── jwt.ts           # JWT 생성/검증
│   │   └── date.ts          # 날짜 처리
│   │
│   └── server.ts            # Express 앱 진입점
│
├── database/                # 데이터베이스 관련
│   └── schema.sql           # 스키마 정의 (초기화 스크립트)
│
├── .env.example             # 환경 변수 템플릿
├── .gitignore
├── package.json
├── tsconfig.json
└── vercel.json              # Vercel 배포 설정
```

**파일 명명 규칙:**
- 모든 파일은 kebab-case
- 타입 정의: `*.types.ts`
- 라우트: `*.routes.ts`
- 컨트롤러: `*.controller.ts`
- 서비스: `*.service.ts`
- 리포지토리: `*.repository.ts`

### 6.2 프론트엔드 디렉토리 구조

```
frontend/
├── public/                  # 정적 파일
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   ├── todo/            # Todo 관련 컴포넌트
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   └── TodoFilter.tsx
│   │   │
│   │   └── auth/            # 인증 관련 컴포넌트
│   │       ├── LoginForm.tsx
│   │       └── RegisterForm.tsx
│   │
│   ├── pages/               # 페이지 컴포넌트 (라우트)
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── TodoListPage.tsx
│   │
│   ├── hooks/               # Custom React Hooks
│   │   ├── useAuth.ts       # 인증 상태 관리
│   │   ├── useTodos.ts      # Todo 상태 관리
│   │   └── useApi.ts        # API 호출 공통 로직
│   │
│   ├── services/            # API 서비스 계층
│   │   ├── api.ts           # API 클라이언트 설정
│   │   ├── auth.service.ts  # 인증 API
│   │   └── todo.service.ts  # Todo API
│   │
│   ├── context/             # React Context
│   │   └── AuthContext.tsx  # 인증 컨텍스트
│   │
│   ├── types/               # TypeScript 타입 정의
│   │   ├── todo.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   │
│   ├── utils/               # 유틸리티 함수
│   │   ├── date.ts          # 날짜 포맷팅
│   │   ├── validation.ts    # 입력 검증
│   │   └── storage.ts       # 로컬스토리지 관리
│   │
│   ├── styles/              # 스타일 파일
│   │   ├── global.css       # 전역 스타일
│   │   └── variables.css    # CSS 변수 (색상, 크기 등)
│   │
│   ├── App.tsx              # 루트 컴포넌트
│   ├── index.tsx            # 앱 진입점
│   └── routes.tsx           # 라우트 정의
│
├── .env.example             # 환경 변수 템플릿
├── .gitignore
├── package.json
├── tsconfig.json
└── vercel.json              # Vercel 배포 설정
```

**파일 명명 규칙:**
- 컴포넌트: PascalCase (`TodoList.tsx`)
- Hooks: camelCase with `use` prefix (`useTodos.ts`)
- 서비스: camelCase with `.service` suffix (`auth.service.ts`)
- 타입: camelCase with `.types` suffix (`todo.types.ts`)
- 유틸: camelCase (`date.ts`)

### 6.3 루트 디렉토리 구조

```
todolist/
├── backend/                 # 백엔드 애플리케이션
├── frontend/                # 프론트엔드 애플리케이션
├── docs/                    # 프로젝트 문서
│   ├── 1-domain-definition.md
│   ├── 2-PRD.md
│   ├── 3-execution-plan.md
│   └── 4-project-principle.md (이 문서)
│
├── swagger/                 # API 문서
│   └── swagger.json
│
├── .gitignore
└── README.md                # 프로젝트 소개
```

---

## 7. 레이어별 상세 규칙

### 7.1 Repository 계층 (Data Access)

**책임:**
- SQL 쿼리 실행
- 데이터베이스 결과를 TypeScript 객체로 변환
- 트랜잭션 관리

**규칙:**
- 비즈니스 로직 포함 금지
- 파라미터화된 쿼리만 사용 (SQL Injection 방어)
- 각 테이블당 하나의 Repository

**예시:**
```typescript
// user.repository.ts
export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async create(email: string, passwordHash: string): Promise<User> {
    const result = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    return result.rows[0];
  }
}
```

### 7.2 Service 계층 (Business Logic)

**책임:**
- 비즈니스 규칙 구현
- 데이터 검증
- Repository 호출 및 조합
- 권한 확인

**규칙:**
- HTTP 요청/응답 객체에 의존 금지
- 순수한 TypeScript 타입만 사용
- Repository 계층에만 의존

**예시:**
```typescript
// todo.service.ts
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async getTodosByUser(userId: number): Promise<Todo[]> {
    const todos = await this.todoRepository.findByUserId(userId);

    // BR-012: 기본 정렬 우선순위 적용
    return this.sortTodos(todos);
  }

  private sortTodos(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => {
      // 1. Overdue 우선
      const aOverdue = this.isOverdue(a);
      const bOverdue = this.isOverdue(b);
      if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;

      // 2. 마감일 빠른 순
      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }

      // 3. 마감일 있는 것 우선
      if (a.due_date && !b.due_date) return -1;
      if (!a.due_date && b.due_date) return 1;

      // 4. 생성일 빠른 순
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }

  // BR-009: 기한 경과 판단
  private isOverdue(todo: Todo): boolean {
    if (todo.is_completed) return false;
    if (!todo.due_date) return false;
    return new Date(todo.due_date) < new Date();
  }
}
```

### 7.3 Controller 계층 (Request Handling)

**책임:**
- HTTP 요청 파싱
- Service 호출
- HTTP 응답 포맷팅
- 에러 HTTP 상태 코드 변환

**규칙:**
- 비즈니스 로직 포함 금지
- Service 계층에만 의존
- 얇게(Thin) 유지

**예시:**
```typescript
// todo.controller.ts
export class TodoController {
  constructor(private todoService: TodoService) {}

  async getTodos(req: Request, res: Response) {
    try {
      const userId = req.user!.id; // JWT 미들웨어에서 설정
      const todos = await this.todoService.getTodosByUser(userId);

      res.json({ todos });
    } catch (error) {
      console.error('Failed to get todos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { title, description, due_date } = req.body;

      // 입력 검증
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const todo = await this.todoService.createTodo(userId, {
        title,
        description,
        due_date
      });

      res.status(201).json({ todo });
    } catch (error) {
      console.error('Failed to create todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
```

### 7.4 React Component 계층

**책임:**
- UI 렌더링
- 사용자 이벤트 처리
- 상태 변경 시 리렌더링

**규칙:**
- 비즈니스 로직 포함 금지 (Custom Hook으로 분리)
- API 호출 직접 수행 금지 (Service 계층 사용)
- 한 컴포넌트는 최대 200줄 이내 권장

**예시:**
```typescript
// TodoList.tsx
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete
}) => {
  if (todos.length === 0) {
    return <div>할 일이 없습니다</div>;
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};
```

---

## 8. 성능 최적화 원칙

### 8.1 데이터베이스 최적화

**인덱스 전략:**
- 자주 조회되는 컬럼에 인덱스 생성 (`user_id`, `due_date`, `is_completed`)
- 복합 인덱스 활용 (`user_id, is_completed`)
- 인덱스 과다 생성 금지 (INSERT/UPDATE 성능 저하)

**쿼리 최적화:**
- N+1 쿼리 문제 방지
- 필요한 컬럼만 SELECT
- LIMIT 활용으로 불필요한 데이터 로딩 방지

### 8.2 프론트엔드 최적화

**번들 크기 최적화:**
- 사용하지 않는 라이브러리 제거
- Code Splitting (React.lazy) 적용 고려
- 프로덕션 빌드 시 압축 활성화

**렌더링 최적화:**
- `React.memo`로 불필요한 리렌더링 방지 (단, 과도한 사용 금지)
- `useMemo`, `useCallback` 적절히 활용
- Key prop 올바르게 사용 (리스트 렌더링 시)

### 8.3 네트워크 최적화

**API 호출 최적화:**
- 불필요한 중복 요청 방지
- 로딩 상태 표시로 사용자 경험 개선
- 에러 발생 시 재시도 로직 (선택)

---

## 9. 체크리스트 (Checklist)

### 9.1 코드 작성 전 체크리스트

- [ ] 이 기능이 MVP에 필요한가? (YAGNI)
- [ ] 더 단순한 방법은 없는가? (KISS)
- [ ] 어느 레이어에 구현해야 하는가?
- [ ] 타입 정의가 필요한가?
- [ ] 보안 취약점은 없는가?

### 9.2 코드 작성 후 체크리스트

- [ ] 함수/변수명이 명확한가?
- [ ] 에러 처리가 적절한가?
- [ ] 사용자별 데이터 격리가 되어 있는가?
- [ ] 환경 변수가 하드코딩되지 않았는가?
- [ ] TypeScript 타입 오류가 없는가?
- [ ] 불필요한 주석은 제거했는가?

### 9.3 PR/Commit 전 체크리스트

- [ ] 빌드 오류가 없는가?
- [ ] 로컬에서 정상 작동하는가?
- [ ] 민감 정보가 포함되지 않았는가?
- [ ] 커밋 메시지가 명확한가?

---

## 10. 참조 문서 (References)

- **PRD:** `docs/2-PRD.md`
- **도메인 정의:** `docs/1-domain-definition.md`
- **실행 계획:** `docs/3-execution-plan.md`
- **API 명세:** `swagger/swagger.json`

---

**문서 종료**
