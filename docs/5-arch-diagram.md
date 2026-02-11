# 기술 아키텍처 다이어그램
# Personal Todo Management System

**문서 버전:** 1.0
**작성일:** 2026-02-11
**프로젝트:** 개인 할 일 관리 시스템 MVP

---

## 1. 전체 시스템 아키텍처 (3-Tier Architecture)

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[React 19 + TypeScript]
        A1[Pages]
        A2[Components]
        A3[Hooks]
        A4[Context]
        A5[Services]

        A --> A1
        A --> A2
        A --> A3
        A --> A4
        A --> A5
    end

    subgraph "Business Logic Layer"
        B[Node.js + Express]
        B1[Routes]
        B2[Controllers]
        B3[Services]
        B4[Repositories]
        B5[Middleware]
        B6[Utils]

        B --> B1
        B --> B2
        B --> B3
        B --> B4
        B --> B5
        B --> B6
    end

    subgraph "Data Layer"
        C[PostgreSQL 17]
        C1[users 테이블]
        C2[todos 테이블]
        C3[Indexes]
        C4[Triggers]

        C --> C1
        C --> C2
        C --> C3
        C --> C4
    end

    A5 -->|HTTP/REST API| B1
    B4 -->|SQL Queries| C

    D[User Browser] -->|HTTPS| A
    E[Vercel Platform] -.->|Hosting| A
    E -.->|Hosting| B
    F[PostgreSQL Server] -.->|Database| C
```

---

## 2. 백엔드 아키텍처 (Backend Architecture)

```mermaid
graph LR
    subgraph "API Gateway"
        R1[/api/auth/register]
        R2[/api/auth/login]
        R3[/api/todos]
        R4[/api/todos/:id]
    end

    subgraph "Middleware Layer"
        M1[authMiddleware]
        M2[errorHandler]
        M3[validator]
        M4[CORS]
    end

    subgraph "Controller Layer"
        C1[AuthController]
        C2[TodoController]
    end

    subgraph "Service Layer"
        S1[AuthService]
        S2[TodoService]
        S3[JWT Utils]
        S4[Password Utils]
    end

    subgraph "Repository Layer"
        P1[UserRepository]
        P2[TodoRepository]
    end

    subgraph "Database"
        D1[(users)]
        D2[(todos)]
    end

    R1 --> M4
    R2 --> M4
    R3 --> M1
    R4 --> M1

    M1 --> M3
    M3 --> C1
    M3 --> C2

    C1 --> S1
    C2 --> S2

    S1 --> S3
    S1 --> S4
    S1 --> P1

    S2 --> P2

    P1 --> D1
    P2 --> D2

    M2 -.->|Error Handling| C1
    M2 -.->|Error Handling| C2
```

---

## 3. 프론트엔드 아키텍처 (Frontend Architecture)

```mermaid
graph TB
    subgraph "Router"
        Route1[/login]
        Route2[/register]
        Route3[/todos]
    end

    subgraph "Pages"
        P1[LoginPage]
        P2[RegisterPage]
        P3[TodoListPage]
    end

    subgraph "Components"
        C1[LoginForm]
        C2[RegisterForm]
        C3[TodoList]
        C4[TodoItem]
        C5[TodoForm]
        C6[Header]
    end

    subgraph "Hooks"
        H1[useAuth]
        H2[useTodos]
        H3[useApi]
    end

    subgraph "Context"
        CTX[AuthContext]
    end

    subgraph "Services"
        S1[authService]
        S2[todoService]
        S3[apiClient]
    end

    Route1 --> P1
    Route2 --> P2
    Route3 --> P3

    P1 --> C1
    P2 --> C2
    P3 --> C3
    P3 --> C5
    P3 --> C6

    C3 --> C4

    C1 --> H1
    C2 --> H1
    C3 --> H2
    C4 --> H2
    C5 --> H2
    C6 --> H1

    H1 --> CTX
    H2 --> CTX
    H3 --> CTX

    H1 --> S1
    H2 --> S2

    S1 --> S3
    S2 --> S3

    S3 -->|HTTP Request| API[Backend API]
```

---

## 4. 데이터 플로우 다이어그램 (Data Flow)

### 4.1 사용자 인증 플로우

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database

    User->>FE: 이메일/비밀번호 입력
    FE->>BE: POST /api/auth/login
    BE->>DB: SELECT * FROM users WHERE email = ?
    DB-->>BE: User Record
    BE->>BE: bcrypt.compare(password)
    BE->>BE: jwt.sign(payload, secret)
    BE-->>FE: { token, user }
    FE->>FE: localStorage.setItem('token')
    FE-->>User: 로그인 성공, /todos로 이동
```

### 4.2 할 일 생성 플로우

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database

    User->>FE: 할 일 제목, 설명, 마감일 입력
    FE->>FE: 입력 검증
    FE->>BE: POST /api/todos<br/>Header: Authorization Bearer {token}
    BE->>BE: authMiddleware: JWT 검증
    BE->>BE: 입력 검증 (title 필수)
    BE->>DB: INSERT INTO todos (user_id, title, ...)
    DB-->>BE: New Todo Record
    BE-->>FE: { todo: {...} }
    FE->>FE: 목록 갱신
    FE-->>User: 할 일 추가됨
```

### 4.3 할 일 조회 및 분류 플로우

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database

    User->>FE: /todos 페이지 진입
    FE->>BE: GET /api/todos<br/>Header: Authorization Bearer {token}
    BE->>BE: authMiddleware: JWT 검증
    BE->>DB: SELECT * FROM todos WHERE user_id = ?<br/>ORDER BY due_date, created_at
    DB-->>BE: List of Todos
    BE->>BE: 정렬 로직 적용 (Overdue 우선)
    BE-->>FE: { todos: [...] }
    FE->>FE: 클라이언트 분류 로직<br/>- Overdue<br/>- Today<br/>- Upcoming<br/>- Completed
    FE-->>User: 분류된 할 일 목록 표시
```

---

## 5. 데이터베이스 ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    USERS ||--o{ TODOS : "owns"

    USERS {
        int id PK
        varchar email UK "UNIQUE NOT NULL"
        varchar password_hash "NOT NULL"
        timestamp created_at "DEFAULT NOW()"
        timestamp updated_at "DEFAULT NOW()"
    }

    TODOS {
        int id PK
        int user_id FK "NOT NULL"
        varchar title "NOT NULL MAX 200"
        text description "NULLABLE"
        date due_date "NULLABLE"
        boolean is_completed "DEFAULT FALSE"
        timestamp created_at "DEFAULT NOW()"
        timestamp updated_at "DEFAULT NOW()"
    }
```

**인덱스:**
- `idx_users_email` ON users(email)
- `idx_todos_user_id` ON todos(user_id)
- `idx_todos_due_date` ON todos(due_date)
- `idx_todos_is_completed` ON todos(is_completed)
- `idx_todos_user_completed` ON todos(user_id, is_completed)

**트리거:**
- `update_users_updated_at`: users 테이블 UPDATE 시 updated_at 자동 갱신
- `update_todos_updated_at`: todos 테이블 UPDATE 시 updated_at 자동 갱신

**삭제 규칙:**
- User 삭제 시 해당 User의 모든 Todo는 CASCADE 삭제

---

## 6. 배포 아키텍처 (Deployment Architecture)

```mermaid
graph TB
    subgraph "User Devices"
        U1[Desktop Browser]
        U2[Mobile Browser]
        U3[Tablet Browser]
    end

    subgraph "CDN / Edge Network"
        CDN[Vercel Edge Network]
    end

    subgraph "Vercel Platform"
        subgraph "Frontend Deployment"
            F1[Static Assets]
            F2[React SPA]
            F3[Build Output]
        end

        subgraph "Backend Deployment"
            B1[Serverless Functions]
            B2[Express API]
            B3[Environment Variables]
        end
    end

    subgraph "Database"
        DB[(PostgreSQL 17)]
    end

    U1 -->|HTTPS| CDN
    U2 -->|HTTPS| CDN
    U3 -->|HTTPS| CDN

    CDN --> F1
    CDN --> F2

    F2 -->|API Requests| B1
    B1 --> B2

    B2 -->|SQL Queries<br/>pg library| DB

    B3 -.->|JWT_SECRET<br/>DATABASE_URL| B2
```

**배포 프로세스:**
1. 코드 푸시 → GitHub Repository
2. Vercel 자동 빌드 트리거
3. 프론트엔드 빌드 (React SPA)
4. 백엔드 빌드 (Express Serverless)
5. 배포 완료 → Edge Network 배포
6. HTTPS 자동 적용

---

## 7. 보안 아키텍처 (Security Architecture)

```mermaid
graph TB
    subgraph "Client Layer"
        C1[Browser]
        C2[Local Storage<br/>JWT Token]
    end

    subgraph "Transport Layer"
        T1[HTTPS/TLS]
    end

    subgraph "Application Layer"
        A1[CORS Middleware]
        A2[Auth Middleware<br/>JWT Verification]
        A3[Input Validation]
        A4[SQL Injection Prevention<br/>Parameterized Queries]
        A5[XSS Prevention<br/>Input Sanitization]
    end

    subgraph "Data Layer"
        D1[bcrypt Password Hashing]
        D2[Environment Variables<br/>Secrets Management]
        D3[User Data Isolation<br/>WHERE user_id = ?]
    end

    C1 --> C2
    C2 --> T1
    T1 --> A1
    A1 --> A2
    A2 --> A3
    A3 --> A4
    A3 --> A5
    A4 --> D1
    A5 --> D2
    D1 --> D3
```

**보안 원칙:**
1. **인증:** JWT 기반, 최소 32자 Secret Key
2. **암호화:** bcrypt (최소 10 rounds)
3. **전송:** HTTPS 강제 (Vercel 자동 제공)
4. **입력 검증:** 클라이언트/서버 양쪽 검증
5. **SQL Injection 방어:** 파라미터화된 쿼리 (`pg` 라이브러리)
6. **XSS 방어:** 입력값 검증 및 이스케이프
7. **접근 제어:** 사용자별 데이터 완전 격리 (user_id 필터)

---

## 8. API 아키텍처 (API Architecture)

```mermaid
graph LR
    subgraph "Public Endpoints"
        P1[POST /api/auth/register]
        P2[POST /api/auth/login]
    end

    subgraph "Protected Endpoints"
        PR1[GET /api/todos]
        PR2[POST /api/todos]
        PR3[PUT /api/todos/:id]
        PR4[DELETE /api/todos/:id]
    end

    subgraph "Middleware Pipeline"
        M1[CORS]
        M2[Body Parser]
        M3[Auth Middleware]
        M4[Validator]
    end

    P1 --> M1
    P2 --> M1

    M1 --> M2
    M2 --> M4

    PR1 --> M1
    PR2 --> M1
    PR3 --> M1
    PR4 --> M1

    M2 --> M3
    M3 --> M4
```

**API 명세:**

| Method | Endpoint | 인증 | 설명 |
|--------|----------|------|------|
| POST | /api/auth/register | ✗ | 회원가입 |
| POST | /api/auth/login | ✗ | 로그인 |
| GET | /api/todos | ✓ | 할 일 목록 조회 |
| POST | /api/todos | ✓ | 할 일 생성 |
| PUT | /api/todos/:id | ✓ | 할 일 수정 |
| DELETE | /api/todos/:id | ✓ | 할 일 삭제 |

**인증 헤더:**
```
Authorization: Bearer {jwt_token}
```

**응답 형식:**
```json
// 성공
{
  "todos": [...],
  "todo": {...},
  "token": "...",
  "user": {...}
}

// 실패
{
  "error": "Error message"
}
```

---

## 9. 상태 관리 아키텍처 (State Management)

```mermaid
graph TB
    subgraph "Global State"
        GS1[AuthContext]
        GS2[User State]
        GS3[JWT Token]
    end

    subgraph "Local State"
        LS1[TodoList State]
        LS2[Form State]
        LS3[UI State]
    end

    subgraph "Persistent State"
        PS1[LocalStorage<br/>token]
    end

    subgraph "Server State"
        SS1[Users DB]
        SS2[Todos DB]
    end

    GS1 --> GS2
    GS1 --> GS3

    GS3 <--> PS1

    LS1 <-->|API Sync| SS2

    GS2 <-->|API Sync| SS1
```

**상태 관리 전략:**
- **전역 상태:** React Context API (AuthContext)
- **로컬 상태:** useState, useReducer
- **서버 상태:** useTodos, useAuth 커스텀 훅
- **영속 상태:** localStorage (JWT 토큰)

---

## 10. 비즈니스 로직 레이어 (Business Logic Layer)

```mermaid
graph TB
    subgraph "Domain Rules"
        DR1[BR-001: 회원 가입 개방]
        DR2[BR-002: 인증 필수]
        DR3[BR-003: 소유권 기반 접근]
        DR4[BR-009: 기한 경과 판단]
        DR5[BR-012: 기본 정렬 우선순위]
        DR6[BR-013: 완료 Todo 분리 표시]
    end

    subgraph "Service Layer Implementation"
        S1[AuthService]
        S2[TodoService]
    end

    subgraph "Core Functions"
        F1[validateEmail]
        F2[hashPassword]
        F3[comparePassword]
        F4[generateToken]
        F5[isOverdue]
        F6[sortTodos]
        F7[classifyTodos]
    end

    DR1 --> S1
    DR2 --> S1
    DR3 --> S2
    DR4 --> F5
    DR5 --> F6
    DR6 --> F7

    S1 --> F1
    S1 --> F2
    S1 --> F3
    S1 --> F4

    S2 --> F5
    S2 --> F6
    S2 --> F7
```

**핵심 비즈니스 로직:**

1. **isOverdue(todo):**
   - 마감일 < 오늘 AND is_completed = false → Overdue

2. **sortTodos(todos):**
   - 우선순위: Overdue > 마감일 빠른 순 > 마감일 없음 > 생성일 빠른 순

3. **classifyTodos(todos):**
   - Overdue: 마감일 < 오늘, 미완료
   - Today: 마감일 = 오늘, 미완료
   - Upcoming: 마감일 > 오늘, 미완료
   - Completed: 완료 상태

---

## 11. 기술 스택 요약 (Technology Stack Summary)

```mermaid
graph LR
    subgraph "Frontend Stack"
        FE1[React 19]
        FE2[TypeScript]
        FE3[React Router]
        FE4[CSS Modules]
        FE5[fetch API]
    end

    subgraph "Backend Stack"
        BE1[Node.js]
        BE2[Express]
        BE3[pg]
        BE4[bcrypt]
        BE5[jsonwebtoken]
        BE6[TypeScript]
    end

    subgraph "Database Stack"
        DB1[PostgreSQL 17]
        DB2[SQL Scripts]
    end

    subgraph "DevOps Stack"
        DO1[Git]
        DO2[npm]
        DO3[Vercel]
        DO4[Environment Variables]
    end

    FE1 & FE2 & FE3 & FE4 & FE5 --> Frontend
    BE1 & BE2 & BE3 & BE4 & BE5 & BE6 --> Backend
    DB1 & DB2 --> Database
    DO1 & DO2 & DO3 & DO4 --> DevOps
```

**주요 라이브러리:**
- **프론트엔드:** react, react-dom, react-router-dom, typescript
- **백엔드:** express, pg, bcrypt, jsonwebtoken, cors, dotenv
- **개발 도구:** typescript, @types/*, eslint, prettier

---

## 12. 성능 아키텍처 (Performance Architecture)

```mermaid
graph TB
    subgraph "Database Performance"
        DP1[Indexes on user_id, due_date, is_completed]
        DP2[Parameterized Queries]
        DP3[Connection Pooling]
    end

    subgraph "Backend Performance"
        BP1[Stateless API]
        BP2[Efficient Query Design]
        BP3[No N+1 Queries]
    end

    subgraph "Frontend Performance"
        FP1[Code Splitting]
        FP2[React.memo]
        FP3[useMemo / useCallback]
        FP4[Lazy Loading]
    end

    subgraph "Network Performance"
        NP1[HTTPS/2]
        NP2[CDN Edge Network]
        NP3[Gzip Compression]
    end

    DP1 & DP2 & DP3 --> DB_Perf[DB 최적화]
    BP1 & BP2 & BP3 --> BE_Perf[Backend 최적화]
    FP1 & FP2 & FP3 & FP4 --> FE_Perf[Frontend 최적화]
    NP1 & NP2 & NP3 --> Net_Perf[Network 최적화]
```

**성능 목표:**
- 할 일 목록 로딩: **2초 이내**
- 할 일 생성/수정/삭제: **1초 이내**
- 페이지 전환: **1초 이내**

---

## 13. 확장성 아키텍처 (Scalability Architecture)

```mermaid
graph TB
    subgraph "Current MVP"
        C1[100 Users]
        C2[Single Region]
        C3[PostgreSQL]
        C4[Vercel Serverless]
    end

    subgraph "Phase 2 (3개월)"
        P2_1[200 Users]
        P2_2[Optimized Queries]
        P2_3[Caching Layer]
    end

    subgraph "Phase 3 (6개월)"
        P3_1[400 Users]
        P3_2[Read Replicas]
        P3_3[CDN Optimization]
    end

    subgraph "Future"
        F1[Multi-Region]
        F2[Horizontal Scaling]
        F3[Microservices]
    end

    C1 --> P2_1
    C2 --> P2_2
    C3 --> P2_3

    P2_1 --> P3_1
    P2_2 --> P3_2
    P2_3 --> P3_3

    P3_1 --> F1
    P3_2 --> F2
    P3_3 --> F3
```

**확장 전략:**
1. **초기 (100명):** 현재 MVP 구조
2. **3개월 (200명):** 쿼리 최적화, 캐싱
3. **6개월 (400명):** Read Replica, CDN
4. **장기:** Multi-Region, Microservices

---

## 14. 모니터링 및 로깅 아키텍처 (Monitoring & Logging)

```mermaid
graph LR
    subgraph "Application Logs"
        L1[Error Logs]
        L2[Access Logs]
        L3[Performance Logs]
    end

    subgraph "Metrics"
        M1[API Response Time]
        M2[Error Rate]
        M3[Active Users]
        M4[Database Queries]
    end

    subgraph "Alerts"
        A1[Error Threshold]
        A2[Performance Degradation]
        A3[Database Issues]
    end

    L1 & L2 & L3 --> Console[Console Output]
    M1 & M2 & M3 & M4 --> Dashboard[Vercel Dashboard]
    A1 & A2 & A3 --> Notification[Alert System]
```

**로그 레벨:**
- `error`: 즉시 대응 필요
- `warn`: 주의 필요
- `info`: 비즈니스 이벤트
- `debug`: 개발 시에만

---

## 15. 참조 문서 (References)

- **도메인 정의서:** `docs/1-domain-definition.md`
- **PRD:** `docs/2-PRD.md`
- **사용자 시나리오:** `docs/3-user-scenario.md`
- **프로젝트 원칙:** `docs/4-project-principle.md`
- **ERD:** `docs/6-ERD.md`
- **실행 계획:** `docs/7-execution-plan.md`
- **API 명세:** `swagger/swagger.json`

---

**문서 종료**
