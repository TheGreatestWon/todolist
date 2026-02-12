

# 반드시 준수할 것
- SOLID 원칙 준수
- Clean Architecture 적요


# Frontend - 할 일 관리 시스템

## 📋 프로젝트 개요

React 19 + TypeScript 기반의 개인 할 일 관리 시스템 프론트엔드

### 주요 기능
- 사용자 인증 (회원가입, 로그인, 로그아웃)
- 할 일 CRUD (생성, 조회, 수정, 삭제)
- 할 일 완료 처리
- 마감일 기반 자동 분류 (오늘, 예정, 기한 경과)
- 반응형 UI (모바일/데스크탑)

### MVP 출시 목표
**이번주 금요일 오후** - 3일 개발 일정

---

## 🛠️ 기술 스택

### Core
- **React**: 19.2.4 (최신 버전)
- **TypeScript**: 4.9.5 (strict mode)
- **React Router**: 7.13.0

### 상태 관리
- React Context API + Hooks

### HTTP 클라이언트
- Native Fetch API (axios 사용 금지)

### 테스팅
- Jest (내장)
- React Testing Library 16.3.2
- @testing-library/jest-dom 6.9.1

### 빌드 도구
- Create React App (react-scripts 5.0.1)

---

## 📁 디렉토리 구조

```
frontend/
├── public/               # 정적 파일
├── src/
│   ├── components/       # React 컴포넌트
│   │   ├── auth/        # 인증 관련 컴포넌트 (RegisterForm, LoginForm)
│   │   ├── todo/        # 할 일 관련 컴포넌트 (TodoCard, TodoList, TodoForm)
│   │   └── common/      # 공통 컴포넌트 (Button, Input, Modal)
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── RegisterPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── TodoListPage.tsx
│   ├── context/         # React Context (AuthContext)
│   ├── hooks/           # Custom Hooks (useAuth, useTodos)
│   ├── services/        # 비즈니스 로직 계층 ✅
│   │   ├── api.ts              # HTTP 클라이언트 래퍼
│   │   ├── auth.service.ts     # 인증 서비스
│   │   └── todo.service.ts     # Todo 서비스 (예정)
│   ├── types/           # TypeScript 타입 정의 ✅
│   │   ├── user.types.ts       # User, RegisterDto, LoginDto
│   │   ├── todo.types.ts       # Todo, CreateTodoDto, UpdateTodoDto
│   │   ├── api.types.ts        # API 응답 타입
│   │   └── index.ts            # 타입 exports
│   ├── utils/           # 유틸리티 함수
│   ├── styles/          # CSS/스타일 파일
│   ├── App.tsx          # 루트 컴포넌트
│   └── index.tsx        # 엔트리 포인트
├── .env.example         # 환경 변수 예시
├── package.json
└── tsconfig.json
```

---

## 🎯 개발 가이드라인

### 1. TypeScript 사용 원칙

#### Strict Mode 준수
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,  // 모든 strict 옵션 활성화
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

#### 명시적 타입 정의
```typescript
// ✅ Good - 명시적 타입
const handleSubmit = async (data: LoginDto): Promise<void> => {
  await authService.login(data.email, data.password);
};

// ❌ Bad - 암시적 any
const handleSubmit = async (data) => {
  await authService.login(data.email, data.password);
};
```

#### 타입 Import
```typescript
// ✅ Good - 타입은 type import
import type { User, Todo } from '../types';
import { authService } from '../services/auth.service';

// ⚠️ Acceptable - 일반 import도 가능하지만 type import 권장
import { User, Todo } from '../types';
```

### 2. 컴포넌트 작성 규칙

#### 함수형 컴포넌트 + Hooks
```typescript
// ✅ Good - 함수형 컴포넼트 사용
interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-card">
      {/* ... */}
    </div>
  );
};

export default TodoCard;
```

#### Props 타입 정의
```typescript
// ✅ Good - Props는 interface로 정의
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

// ❌ Bad - type alias 사용 지양
type ButtonProps = {
  children: React.ReactNode;
  // ...
};
```

### 3. 상태 관리 패턴

#### Context API 사용
```typescript
// AuthContext 예시
interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### Local State vs Context
```typescript
// ✅ Local State - 컴포넌트 내부에서만 사용
const [isOpen, setIsOpen] = useState(false);

// ✅ Context - 여러 컴포넌트에서 공유
const { user, isAuthenticated } = useAuth();
```

### 4. API 호출 패턴

#### Service 계층 사용
```typescript
// ✅ Good - Service 계층 통해 호출
import { authService } from '../services/auth.service';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authService.login(email, password);
    // 성공 처리
  } catch (error) {
    // 에러 처리
  }
};

// ❌ Bad - 직접 fetch 호출 금지
const handleLogin = async () => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    // ...
  });
};
```

#### 에러 처리
```typescript
// ✅ Good - ErrorResponse 타입 사용
import type { ErrorResponse } from '../types/api.types';

try {
  await authService.register(email, password);
} catch (error) {
  const errorResponse = error as ErrorResponse;
  setErrorMessage(errorResponse.error || '등록 중 오류가 발생했습니다');
}
```

### 5. 파일 네이밍 컨벤션

```
컴포넌트:     PascalCase.tsx      (예: TodoCard.tsx, LoginForm.tsx)
훅:          camelCase.ts        (예: useAuth.ts, useTodos.ts)
서비스:       camelCase.service.ts (예: auth.service.ts)
타입:        camelCase.types.ts   (예: user.types.ts)
유틸리티:     camelCase.ts        (예: dateUtils.ts)
테스트:       *.test.ts(x)        (예: auth.service.test.ts)
스타일:       *.css               (예: App.css, TodoCard.css)
```

### 6. Import 순서

```typescript
// 1. React 관련
import React, { useState, useEffect } from 'react';

// 2. 서드파티 라이브러리
import { useNavigate } from 'react-router-dom';

// 3. 타입 (type import 사용)
import type { User, Todo } from '../types';

// 4. 서비스/유틸리티
import { authService } from '../services/auth.service';
import { formatDate } from '../utils/dateUtils';

// 5. 컴포넌트
import Button from '../components/common/Button';

// 6. 스타일
import './TodoCard.css';
```

---

## 🧪 테스팅 전략

### 테스트 커버리지 목표
**최소 80% 이상**

### 테스트 작성 원칙

#### 1. 단위 테스트 (Unit Tests)
```typescript
// services, utils, hooks 테스트
describe('authService.login', () => {
  it('should login successfully and return AuthResponse', async () => {
    // Mock 설정
    // 함수 호출
    // Assertion
  });
});
```

#### 2. 컴포넌트 테스트
```typescript
// components 테스트
import { render, screen, fireEvent } from '@testing-library/react';

describe('LoginForm', () => {
  it('should submit form with valid credentials', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    // 사용자 인터랙션 시뮬레이션
    // Assertion
  });
});
```

#### 3. Mock 전략
```typescript
// __mocks__/services/api.ts
export const authApi = {
  register: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};
```

### 테스트 실행
```bash
# 전체 테스트 실행
npm test

# 특정 파일 테스트
npm test -- --testPathPattern=auth.service.test.ts

# 커버리지 확인
npm test -- --coverage

# Watch 모드
npm test -- --watch
```

---

## ✅ 완료된 작업

### Phase 1: 기초 설정 ✅
- [x] 프로젝트 초기 설정 (CRA)
- [x] 디렉토리 구조 생성
- [x] TypeScript 설정 (strict mode)
- [x] 환경 변수 설정

### Phase 2: 타입 시스템 ✅
- [x] User 타입 정의 (user.types.ts)
- [x] Todo 타입 정의 (todo.types.ts)
- [x] API 응답 타입 정의 (api.types.ts)
- [x] 타입 테스트 작성 및 통과 (10/10)

### Phase 3: API 계층 ✅
- [x] API 클라이언트 구현 (api.ts)
  - [x] HTTP 래퍼 함수 (apiRequest)
  - [x] 토큰 관리 (getAuthToken, setAuthToken, removeAuthToken)
  - [x] authApi (register, login, logout)
  - [x] todoApi (getTodos, createTodo, updateTodo, deleteTodo)
- [x] API 테스트 작성 및 통과 (13/13)

### Phase 4: 서비스 계층 ✅
- [x] Auth Service 구현 (auth.service.ts)
  - [x] register(email, password): Promise<void>
  - [x] login(email, password): Promise<AuthResponse>
  - [x] logout(): void
  - [x] getToken(): string | null
- [x] Auth Service 테스트 작성 및 통과 (11/11)

---

## 📝 남은 작업 (실행 계획 참조)

### Task 3.5: Todo Service 구현
- [ ] `todo.service.ts` 생성
- [ ] getTodos, createTodo, updateTodo, deleteTodo 함수
- [ ] 테스트 작성 (커버리지 80% 이상)

### Task 3.6: AuthContext 구현
- [ ] AuthProvider 컴포넌트
- [ ] useAuth custom hook
- [ ] 로그인 상태 관리
- [ ] Protected Route 처리

### Task 3.7: Custom Hooks 구현
- [ ] useTodos hook (할 일 상태 관리)
- [ ] useForm hook (폼 핸들링)

### Task 3.8: 공통 컴포넌트 구현
- [ ] Button, Input, Modal 등

### Task 3.9-3.12: 페이지 및 컴포넌트 구현
- [ ] 회원가입/로그인 컴포넌트
- [ ] Todo 컴포넌트
- [ ] 페이지 컴포넌트

### Task 3.13: 라우팅 설정
- [ ] React Router 설정
- [ ] Protected Routes
- [ ] 리다이렉트 로직

### Task 3.14: 스타일링 및 반응형 디자인
- [ ] CSS 적용
- [ ] 반응형 레이아웃 (모바일/데스크탑)
- [ ] 스타일 가이드 준수 (@docs/9-APP_STYLE_GUIDE.md)

---

## 🎨 스타일링 가이드

### 디자인 시스템
**Microsoft To Do 스타일** 기반 미니멀 디자인

상세 내용: `@docs/9-APP_STYLE_GUIDE.md` 참조

### 주요 색상
```css
--primary-red: #E44232;
--white: #FFFFFF;
--gray-50: #FAFAFA;
--gray-800: #424242;
--success: #4CAF50;
--warning: #FFC107;
--error: #F44336;
```

### 반응형 브레이크포인트
```css
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
```

---

## 🚀 개발 명령어

```bash
# 개발 서버 시작 (http://localhost:3000)
npm start

# 프로덕션 빌드
npm build

# 테스트 실행
npm test

# TypeScript 컴파일 체크
npx tsc --noEmit

# 린트 체크 (ESLint)
npm run lint  # 설정 필요 시
```

---

## 🔧 환경 변수

`.env` 파일 생성 (`.env.example` 참조):
```bash
REACT_APP_API_URL=http://localhost:3001/api
```

**중요:**
- 환경 변수는 반드시 `REACT_APP_` 접두사 사용
- `.env` 파일은 Git에 커밋하지 않음 (`.gitignore`에 포함)

---

## 📚 참조 문서

- **PRD**: `@docs/2-PRD.md` - 제품 요구사항 명세
- **실행 계획**: `@docs/7-execution-plan.md` - 개발 일정 및 태스크
- **스타일 가이드**: `@docs/9-APP_STYLE_GUIDE.md` - UI/UX 디자인 시스템
- **와이어프레임**: `@docs/8-wireframe.md` - 화면 설계

---

## ⚠️ 중요 제약사항

### 절대 금지 사항
1. **Axios 사용 금지** - Fetch API만 사용
2. **클래스 컴포넌트 금지** - 함수형 컴포넌트만 사용
3. **Redux 사용 금지** - Context API + Hooks 사용
4. **any 타입 사용 최소화** - 명시적 타입 정의
5. **오버엔지니어링 금지** - 단순하고 명확한 구현

### TypeScript Strict 규칙
- `strict: true` 유지
- null/undefined 명시적 처리
- 모든 함수/변수에 타입 정의

### 테스트 필수
- 모든 서비스/유틸리티 함수에 테스트 작성
- 최소 커버리지 80% 달성
- 테스트 통과 전 커밋 금지

---

## 🐛 디버깅 팁

### React DevTools
Chrome/Firefox 확장 프로그램 설치 권장

### TypeScript 에러
```bash
# 타입 에러 확인
npx tsc --noEmit

# 특정 파일만 체크
npx tsc --noEmit src/services/auth.service.ts
```

### API 디버깅
```typescript
// api.ts에서 console.log 추가 (개발 시에만)
console.log('API Request:', endpoint, options);
console.log('API Response:', data);
```

---

## 📞 문제 발생 시

1. **타입 에러**: TypeScript strict 모드 설정 확인
2. **API 호출 실패**:
   - 백엔드 서버 실행 확인 (http://localhost:3001)
   - CORS 설정 확인
   - 환경 변수 확인 (.env)
3. **테스트 실패**: Mock 설정 확인
4. **빌드 실패**: package.json 의존성 확인

---

**작성일**: 2026-02-12
**버전**: 1.0.0
**담당**: Frontend Development Team
