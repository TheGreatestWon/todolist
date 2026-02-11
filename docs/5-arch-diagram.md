# 시스템 아키텍처 다이어그램

## 3-Tier Architecture

```mermaid
graph TB
    subgraph "Frontend (Presentation Layer)"
        A["React 19 + TypeScript"]
        B["UI Components<br/>(Login, TodoList, TodoForm, etc.)"]
        C["State Management<br/>(React Hooks/Context)"]
        D["API Client<br/>(fetch/axios)"]
        E["Routing<br/>(React Router)"]
    end

    subgraph "Backend (Business Logic Layer)"
        F["Node.js/Express"]
        G["Authentication Middleware<br/>(JWT)"]
        H["API Controllers<br/>(authController, todoController)"]
        I["Business Logic Services<br/>(authService, todoService)"]
        J["Input Validation<br/>(Custom validation)"]
        K["Error Handling<br/>(Global error handler)"]
    end

    subgraph "Database (Data Layer)"
        L["PostgreSQL 17"]
        M["Users Table<br/>(id, email, password_hash, timestamps)"]
        N["Todos Table<br/>(id, user_id, title, description, due_date, is_completed, timestamps)"]
    end

    A --> B
    A --> C
    A --> D
    A --> E
    B --> D
    C --> D
    E --> D
    
    D --> F
    F --> G
    F --> H
    F --> I
    F --> J
    F --> K
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M
    L --> N

    style A fill:#e1f5fe
    style B fill:#e1f5fe
    style C fill:#e1f5fe
    style D fill:#e1f5fe
    style E fill:#e1f5fe
    style F fill:#f3e5f5
    style G fill:#f3e5f5
    style H fill:#f3e5f5
    style I fill:#f3e5f5
    style J fill:#f3e5f5
    style K fill:#f3e5f5
    style L fill:#e8f5e8
    style M fill:#e8f5e8
    style N fill:#e8f5e8
```

## 아키텍처 설명

### 프론트엔드 계층 (Frontend/Presentation Layer)
- **기술 스택**: React 19 + TypeScript
- **주요 구성 요소**:
  - UI 컴포넌트 (로그인, 할 일 목록, 폼 등)
  - 상태 관리 (React Hooks 및 Context API)
  - API 클라이언트 (fetch 또는 axios)
  - 라우팅 (React Router)
- **기능**: 사용자 인터페이스 렌더링 및 사용자 상호작용 처리

### 백엔드 계층 (Backend/Business Logic Layer)
- **기술 스택**: Node.js/Express
- **주요 구성 요소**:
  - 인증 미들웨어 (JWT 기반)
  - API 컨트롤러 (인증, 할 일 관리)
  - 비즈니스 로직 서비스
  - 입력 검증
  - 오류 처리
- **기능**: 비즈니스 로직 처리 및 API 엔드포인트 관리

### 데이터베이스 계층 (Database/Data Layer)
- **기술 스택**: PostgreSQL 17
- **주요 구성 요소**:
  - Users 테이블 (사용자 정보)
  - Todos 테이블 (할 일 정보)
- **기능**: 데이터 저장 및 검색

## 데이터 흐름
1. 프론트엔드에서 사용자 요청이 발생
2. API 클라이언트를 통해 백엔드로 요청 전송
3. 백엔드에서 인증 및 비즈니스 로직 처리
4. 데이터베이스에서 데이터 조회/저장
5. 결과를 프론트엔드로 반환하여 UI 업데이트

## 보안 고려사항
- JWT 기반 인증으로 사용자 세션 관리
- 모든 API 요청에 대한 인증/인가 검증
- 입력 검증을 통한 보안 취약점 방지
- 비밀번호는 bcrypt로 암호화 저장
- SQL Injection 방지를 위한 파라미터화된 쿼리 사용