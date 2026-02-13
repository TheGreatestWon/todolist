# 도메인 정의서 (Domain Definition)

## 1. 도메인 핵심 정의 (Core Domain)


### 1.1 프로젝트 범위 및 일정
- MVP출시 목표 일정은 언제인가요? 이번주 금요일 오후
- MVP에 반드시 포함되어야 할 핵심 기능은 무엇인가요?
 (회원등록, 로그인, 할일추가, 수정, 삭제, 완료처리:로그인한 사용자만 사용 가능함)
- 개발일정은 대략 3일이야.

### 1.2 본질적 문제
개인 사용자는 매일 여러 할 일을 생성하지만,
현재 시점에서 **무엇을 지금 해야 하는지**, **이미 늦은 일은 무엇인지**,
**완료한 일과 아직 남은 일을 명확히 구분**하지 못한다.

특히 개인 데이터가 안전하게 분리된 상태에서
**마감일과 상태 중심으로 사고할 수 있는 일정 관리 도구**가 필요하다.

---

### 1.3 도메인 중심
**Personal Todo Management** 도메인은
> 인증된 개인 사용자가 자신의 할 일을 생성하고,
> 상태와 시간의 흐름에 따라 자연스럽게 정리·추적·완료하도록 돕는 도메인이다.

이 도메인의 핵심 가치는 다음 세 가지다:
- 개인별 데이터 격리
- 상태 기반 인지 (미완료 / 완료 / 기한 경과)
- 시간 흐름 기반 판단 (오늘, 예정, 지연)

---

## 2. 도메인 범위 (Bounded Context)

### 2.1 포함 (In Scope)
- 사용자 계정 등록 및 인증
- 인증된 사용자 기반 접근 제어
- 할 일(Todo) 생명주기 관리
  - 생성, 수정, 삭제
  - 완료 / 미완료 전환
- 마감일(Due Date) 관리
- 기한 경과(Overdue) 자동 판단
- 상태 및 시간 기준 분류

---

### 2.2 제외 (Out of Scope)
- 할 일 공유 및 협업
- 카테고리, 태그, 우선순위 레벨
- 반복 일정
- 알림, 푸시, 리마인더
- 댓글, 첨부파일
- 통계, 분석 기능

---

## 3. Ubiquitous Language (공통 언어)

### User (사용자)
시스템에 등록된 개인 사용자로, 자신의 할 일 목록을 소유한다.

### Authenticated User (인증된 사용자)
인증을 완료하여 할 일 관리 기능을 사용할 수 있는 사용자.

### Todo (할 일)
사용자가 수행해야 하는 단일 작업 단위.

### Due Date (마감일)
할 일을 완료해야 하는 목표 날짜.

### Completion Status (완료 상태)
할 일의 수행 여부를 나타내는 상태.
- Incomplete
- Completed

### Overdue (기한 경과)
마감일이 지났고 아직 완료되지 않은 상태적 특성.

### Ownership (소유권)
사용자가 자신이 생성한 Todo에 대해 가지는 배타적 권한.

---

## 4. Aggregate 및 관계

### 4.1 Aggregate 구성
이 도메인은 두 개의 독립적인 Aggregate로 구성된다.

- User Aggregate
- Todo Aggregate

각 Aggregate는 독립적인 트랜잭션 경계를 가진다.

---

### 4.2 User Aggregate

**Aggregate Root:** User

**역할**
- 사용자 식별 기준
- 인증의 기준 주체
- Todo 소유권의 기준

**속성 (Schema)**
- `id` (SERIAL, Primary Key): 사용자 고유 식별자
- `email` (VARCHAR(255), UNIQUE NOT NULL): 로그인 이메일 주소
- `password_hash` (VARCHAR(255), NOT NULL): bcrypt 해시된 비밀번호
- `created_at` (TIMESTAMP): 계정 생성 시각 (자동 설정)
- `updated_at` (TIMESTAMP): 계정 정보 수정 시각 (자동 갱신)

**규칙**
- User는 Todo를 직접 포함하지 않는다.
- Todo는 UserId만 참조한다.
- 비밀번호는 평문으로 저장되지 않으며, bcrypt 해싱 후 저장된다.

---

### 4.3 Todo Aggregate

**Aggregate Root:** Todo

**역할**
- 할 일의 생명주기 관리
- 상태 전이 관리
- 마감일 기준 판단의 주체

**속성 (Schema)**
- `id` (SERIAL, Primary Key): Todo 고유 식별자
- `user_id` (INTEGER, NOT NULL, Foreign Key): 소유자 사용자 ID (ON DELETE CASCADE)
- `title` (VARCHAR(200), NOT NULL): 할 일 제목 (필수)
- `description` (TEXT, Nullable): 할 일 상세 설명
- `due_date` (DATE, Nullable): 마감일 (YYYY-MM-DD 형식, 선택)
- `is_completed` (BOOLEAN, DEFAULT FALSE): 완료 상태 (Incomplete/Completed)
- `created_at` (TIMESTAMP): 생성 시각 (자동 설정)
- `updated_at` (TIMESTAMP): 수정 시각 (자동 갱신)

**규칙**
- Todo는 반드시 하나의 User에 소유된다.
- User 객체를 직접 참조하지 않는다.
- User 삭제 시 해당 Todo는 자동으로 삭제된다 (CASCADE).

---

### 4.4 관계 규칙
- User : Todo = 1 : N
- Todo는 반드시 유효한 UserId를 가진다.
- User 삭제 시 해당 User의 Todo는 함께 삭제된다.

---

## 5. 엔티티 책임과 불변식

### 5.1 User

**책임**
- 사용자 식별자 유지
- 인증 정보 보유 (email, password_hash)
- JWT 토큰 발급의 기준
- 시스템 접근 권한의 기준

**불변식**
- User는 고유한 식별자(id)를 가진다.
- User는 고유한 email을 가진다.
- User는 유효한 인증 정보를 가진다 (password_hash).
- 비밀번호는 bcrypt 해싱되어 저장된다.

---

### 5.2 Todo

**책임**
- 작업 제목과 설명 관리 (title, description)
- 완료 상태 관리 (is_completed)
- 마감일 기준 기한 경과 판단 (due_date)
- 생성 및 수정 이력 기록 (created_at, updated_at)

**불변식**
- Todo는 반드시 소유자(user_id)를 가진다.
- Todo는 반드시 제목(title)을 가진다.
- Todo는 명확한 완료 상태(is_completed: true/false)를 가진다.
- created_at와 updated_at는 자동으로 관리된다.

---

## 6. 비즈니스 규칙 (Business Rules)

### BR-001: 회원 가입 개방 ✅
누구나 회원으로 등록할 수 있다.
- **구현**: AuthService.register() - 이메일 중복 검증 후 사용자 생성
- **검증**: 백엔드 테스트 통과

### BR-002: 인증 필수 ✅
인증된 사용자만 Todo를 관리할 수 있다.
- **구현**: JWT 기반 인증 (authMiddleware)
- **방식**: Bearer Token (Authorization 헤더)
- **검증**: 백엔드 미들웨어 구현 완료

### BR-003: 소유권 기반 접근 ✅
사용자는 자신의 Todo만 조회, 수정, 삭제할 수 있다.
- **구현**: TodoService에서 user_id 검증
- **검증**: updateTodo, deleteTodo에서 소유권 확인 후 작업 수행

### BR-004: Todo 생성 ✅
- 제목은 필수이다.
- 생성 시 상태는 Incomplete (is_completed = false)이다.
- **구현**: CreateTodoDto에서 title 필수, DB default false
- **검증**: 제목 없는 Todo 생성 시 에러 발생

### BR-005: Todo 수정 ✅
- 제목, 설명, 마감일, 완료 상태는 수정 가능하다.
- 수정 시점은 자동으로 기록된다 (updated_at 트리거).
- **구현**: UpdateTodoDto, update_updated_at_column() 트리거
- **검증**: 수정 시 updated_at 자동 갱신 확인

### BR-006: Todo 삭제 ✅
- 삭제된 Todo는 복구할 수 없다.
- **구현**: TodoRepository.delete() - 물리적 삭제
- **검증**: Soft delete 없음, 완전 삭제

### BR-007: 완료 처리 ✅
- Incomplete (is_completed = false) ↔ Completed (is_completed = true) 전환이 가능하다.
- **구현**: UpdateTodoDto에서 is_completed 필드로 전환
- **검증**: 상태 전환 API 테스트 통과

### BR-008: 마감일 선택성 ✅
마감일은 선택 사항이다 (due_date nullable).
- **구현**: Schema에서 due_date DATE NULL
- **검증**: 마감일 없는 Todo 생성 가능

### BR-009: 기한 경과 판단 ✅
- 현재 날짜 > 마감일 AND 상태 = Incomplete → Overdue
- Completed 상태는 Overdue로 간주하지 않는다.
- **구현**: isOverdue(due_date, is_completed) 유틸리티 함수
- **검증**: 날짜 단위 비교 (00:00:00 정규화)

### BR-010: 기한 경과 표시 ✅
Overdue Todo는 시각적으로 명확히 구분되어야 한다.
- **구현**: TodoStatus.OVERDUE enum 정의
- **검증**: 프론트엔드 TodoWithStatus 인터페이스

---

## 7. 상태 모델

### 7.1 허용 상태
- **Incomplete** (is_completed = false): 미완료 상태
- **Completed** (is_completed = true): 완료 상태
- **Overdue** (파생 상태): due_date < 현재 날짜 AND is_completed = false

### 7.2 UI 분류 상태 (TodoStatus Enum) ✅
프론트엔드에서 사용하는 추가 분류 상태:
```typescript
enum TodoStatus {
  TODAY = 'TODAY',           // 마감일이 오늘
  UPCOMING = 'UPCOMING',     // 마감일이 미래
  OVERDUE = 'OVERDUE',       // 마감일이 과거 + 미완료
  COMPLETED = 'COMPLETED',   // 완료됨
  NO_DUE_DATE = 'NO_DUE_DATE' // 마감일 없음
}
```

### 7.3 불허 상태
- 소유자 없는 Todo (user_id NULL - DB 제약으로 방지)
- 제목 없는 Todo (title NULL - DB 제약으로 방지)
- 정의되지 않은 is_completed 값 (BOOLEAN DEFAULT FALSE)

---

### 7.4 상태 전이 ✅

- 생성 → Incomplete (자동, is_completed = false)
- Incomplete ↔ Completed (사용자 명령, UpdateTodoDto)
- 생성 → Completed 직접 전이 불가 (CreateTodoDto에 is_completed 필드 없음)

**구현 검증**:
- 생성 시 DEFAULT FALSE 적용
- 수정 API에서만 is_completed 변경 가능

---

## 8. macOS Todo 수준을 위한 도메인 보완

### 8.1 시간 흐름 기반 인지
Todo는 상태뿐 아니라 **시간 흐름 관점에서 인지**되어야 한다.
- 오늘 해야 할 일
- 예정된 할 일
- 이미 늦은 할 일

이는 UI가 자연스럽게 그룹화되도록 강제한다.

---

### 8.2 인지 우선 설계
도메인의 목적은 "많이 관리"가 아니라
**"지금 무엇을 해야 하는지 즉시 알게 하는 것"**이다.

---

## 9. 검증 가능 기준 (Test View)

### 9.1 구현 완료 및 검증 완료 ✅
- [x] 인증되지 않은 사용자는 Todo 생성 불가 (authMiddleware)
- [x] 제목 없는 Todo 생성 불가 (TodoService.createTodo 검증)
- [x] 마감일 경과 + 미완료 → Overdue (isOverdue 함수)
- [x] Completed Todo는 Overdue 아님 (isOverdue 로직)
- [x] 다른 사용자의 Todo 접근 불가 (user_id 검증)
- [x] User 삭제 시 Todo 자동 삭제 (ON DELETE CASCADE)
- [x] updated_at 자동 갱신 (트리거 함수)
- [x] 비밀번호 해싱 (bcrypt, AuthService)
- [x] JWT 토큰 발급 및 검증 (jwt.ts, authMiddleware)

---

## 10. 유지보수 및 확장 포인트

- 협업 기능 추가 시 새로운 Aggregate 필요
- 반복 일정은 Todo 확장이 아닌 별도 모델 필요
- 알림 기능은 도메인 이벤트 기반 확장 가능

---

## 11. 기술 스택 : 프론트엔드, 백엔드, 데이터베이스의 3-티어 구조의 애플리케이션

- 프론트엔드 프레임워크는? React 19 + Typescript
- 백엔드 기술 스택은? Node.js/Express + pg(PostgreSQL DB연동 라이브러리, 절대 Prisma 사용하지말것)
- 데이터베이스는? PostgreSQL 17
- 배포환경은? vercel
- 알림 기능은 도메인 이벤트 기반 확장 가능

---

## 12. 사용자 및 페르소나
- 주요 타겟 사용자는? 일반인 모두
- 주요 사용 디바이스는? 데스크탑 또는 모바일
- 모바일 환경 지원이 필수인가요? 필수, 반응형 UI 지원해야 함
- 최대 사용자수는? 대략 100명이하로 시작해서 3개월마다 2배씩 증량


---

## [추가] 13. MVP 수준 TodoList를 위한 최소 도메인 보완

본 섹션은 macOS 수준의 복잡한 구조를 도입하지 않고,  
**간단한 개인용 TodoList를 안정적으로 구현하기 위한 최소 보완 규칙**을 정의한다.

---

## 13.1 기본 리스트(Default List) 개념

### 도메인 의도
초기 버전에서는 복수의 리스트를 지원하지 않지만,  
모든 Todo는 **논리적으로 하나의 기본 리스트(Default List)** 에 속한다고 간주한다.

이는 향후 리스트 기능 확장을 대비한 **도메인 여지 확보 목적**이다.

---

### 도메인 규칙

**BR-011: 기본 리스트 존재**
- 모든 사용자는 하나의 기본 TodoList를 가진다.
- 초기 버전에서는 사용자가 리스트를 직접 생성하거나 관리하지 않는다.

**BR-012: Todo의 리스트 소속**
- 모든 Todo는 기본 리스트에 속한다.
- Todo는 리스트 없이 단독으로 존재할 수 없다.
- **구현 상태**: 현재 버전에서는 명시적 list_id 없음, 향후 확장 고려

---

## 13.2 시간 기준 및 마감일 해석 규칙

### 도메인 의도
MVP 단계에서는 **과도한 시간 복잡도를 피하고**,  
사용자가 직관적으로 이해할 수 있는 기준을 우선한다.

---

### 도메인 규칙

**BR-013: 마감일 해상도** ✅
- 마감일(Due Date)은 **날짜 단위(YYYY-MM-DD)** 로만 관리한다.
- 시간(HH:mm)은 고려하지 않는다.
- **구현**: due_date DATE 타입, isOverdue에서 시간 정규화 (setHours(0,0,0,0))

**BR-014: 현재 날짜 기준** ✅
- 모든 마감일 비교는 **사용자 로컬 날짜 기준**으로 판단한다.
- **구현**: JavaScript Date 객체 사용, 로컬 타임존 적용

---

## 13.3 Todo 분류 기준 (UI를 위한 도메인 규칙)

### 도메인 의도
UI에서 자연스럽게 Todo가 구분되도록  
도메인 차원에서 **분류 기준을 명확히 정의**한다.

---

### 도메인 규칙

**BR-015: 오늘 할 일 (Today)** ✅
- 마감일이 오늘인 Todo
- 상태가 Incomplete인 경우에만 해당
- **구현**: TodoStatus.TODAY enum

**BR-016: 예정된 할 일 (Upcoming)** ✅
- 마감일이 오늘 이후인 Todo
- 상태가 Incomplete인 경우
- **구현**: TodoStatus.UPCOMING enum

**BR-017: 기한 경과 (Overdue)** ✅
- 마감일이 오늘 이전이고
- 상태가 Incomplete인 Todo
- **구현**: TodoStatus.OVERDUE enum, isOverdue 함수

**BR-018: 마감일 없는 할 일** ✅
- 마감일이 없는 Todo는
  - Overdue로 간주하지 않는다
  - 일반 Incomplete Todo로 취급한다
- **구현**: TodoStatus.NO_DUE_DATE enum, isOverdue에서 null 체크

---

## 13.4 기본 정렬 규칙 (MVP 기준)

### 도메인 의도
사용자가 별도 설정 없이도  
**지금 가장 중요한 Todo부터 인지**할 수 있도록 한다.

---

### 도메인 규칙

**BR-019: 기본 정렬 우선순위** ✅
Todo 목록은 다음 순서로 정렬된다.

1. Overdue Todo
2. 마감일이 가장 빠른 Todo
3. 마감일이 없는 Todo
4. 생성 시점이 빠른 Todo

**구현**: TodoService.getTodosByUser() 정렬 로직
```typescript
// 1. Overdue 우선
if (aIsOverdue && !bIsOverdue) return -1;
// 2. due_date 오름차순
if (a.due_date < b.due_date) return -1;
// 3. created_at 오름차순
if (a.created_at < b.created_at) return -1;
```

---

## 13.5 완료 Todo 표시 정책

### 도메인 의도
완료된 할 일은 중요도가 낮아지므로  
기본적으로 사용자의 주의를 방해하지 않도록 한다.

---

### 도메인 규칙

**BR-020: 완료 Todo 기본 정책** ✅
- Completed 상태의 Todo는 기본 목록에서 분리하여 표시한다.
- Completed Todo는 별도 영역에서 조회 가능하다.
- Completed Todo도 수정 및 삭제는 가능하다.
- **구현**: TodoStatus.COMPLETED enum, UI에서 필터링 예정

---

## 13.6 검증 가능 기준 보강 (Test View 확장)

다음 항목은 자동 테스트 또는 수동 검증이 가능해야 한다.

- [x] 모든 Todo는 기본 리스트에 속한다 (user_id 외래키)
- [x] 마감일은 날짜 단위로만 처리된다 (DATE 타입, isOverdue 정규화)
- [x] 마감일이 오늘 이전 + Incomplete → Overdue (isOverdue 함수)
- [x] 마감일 없는 Todo는 Overdue가 아니다 (isOverdue null 체크)
- [x] Overdue Todo는 목록 상단에 노출된다 (정렬 로직)
- [x] Completed Todo는 기본 목록에서 분리되어 표시된다 (TodoStatus enum)

---

## 14. 인증 및 보안 메커니즘 ✅

### 14.1 사용자 인증 방식
**JWT (JSON Web Token) 기반 인증**

#### 회원가입 프로세스
1. 클라이언트가 email, password 전송
2. 서버가 이메일 중복 검증
3. bcrypt로 비밀번호 해싱 (salt rounds: 10)
4. users 테이블에 저장 (password_hash)

#### 로그인 프로세스
1. 클라이언트가 email, password 전송
2. 서버가 사용자 조회
3. bcrypt로 비밀번호 비교
4. JWT 토큰 생성 (payload: userId, email)
5. 토큰 및 사용자 정보 반환 (password_hash 제외)

#### 인증된 요청 처리
1. 클라이언트가 `Authorization: Bearer <token>` 헤더 포함
2. authMiddleware에서 토큰 추출 및 검증
3. 유효한 경우 req.user에 userId, email 첨부
4. 컨트롤러에서 req.user.userId로 소유권 검증

### 14.2 보안 규칙
- 비밀번호 평문 저장 금지 (bcrypt 해싱)
- API 응답에서 password_hash 제외 (SafeUser 타입)
- 모든 Todo API는 authMiddleware 적용
- 소유권 검증 (user_id === req.user.userId)
- ON DELETE CASCADE로 데이터 무결성 유지

---

## 15. 데이터 무결성 규칙 ✅

### 15.1 데이터베이스 제약조건
1. **외래키 제약**: todos.user_id → users.id (ON DELETE CASCADE)
2. **고유 제약**: users.email (UNIQUE)
3. **NOT NULL 제약**: users.email, users.password_hash, todos.user_id, todos.title
4. **기본값**: todos.is_completed (DEFAULT FALSE)

### 15.2 자동 타임스탬프 관리
**트리거 함수**: `update_updated_at_column()`
- users 테이블: UPDATE 시 updated_at 자동 갱신
- todos 테이블: UPDATE 시 updated_at 자동 갱신
- created_at: INSERT 시 CURRENT_TIMESTAMP 자동 설정

### 15.3 인덱스 최적화
```sql
-- 사용자 조회 최적화
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Todo 조회 최적화
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_due_date ON todos(due_date);
CREATE INDEX idx_todos_is_completed ON todos(is_completed);
CREATE INDEX idx_todos_user_completed ON todos(user_id, is_completed);
```

---

## 16. 변경 이력 (Change Log)

### 2026-02-13 (v2.0) - 구현 완료 후 갱신
**갱신 사유**: 백엔드 및 프론트엔드 구현 완료 후 실제 구현 내용 반영

**추가된 내용**:
1. **엔티티 속성 명세 추가** (4.2, 4.3절)
   - User: id, email, password_hash, created_at, updated_at
   - Todo: id, user_id, title, description, due_date, is_completed, created_at, updated_at

2. **인증 메커니즘 추가** (14절 신규)
   - JWT 기반 인증 방식 명세
   - 회원가입/로그인 프로세스
   - bcrypt 비밀번호 해싱
   - authMiddleware 인증 검증

3. **데이터 무결성 규칙** (15절 신규)
   - 외래키 제약조건 (ON DELETE CASCADE)
   - 고유 제약 및 NOT NULL 제약
   - 자동 타임스탬프 관리 (트리거)
   - 인덱스 최적화 전략

4. **TodoStatus Enum 추가** (7.2절)
   - TODAY, UPCOMING, OVERDUE, COMPLETED, NO_DUE_DATE
   - UI 분류를 위한 파생 상태

5. **비즈니스 규칙 검증 상태 표시**
   - BR-001 ~ BR-020 모든 규칙에 ✅ 구현 완료 표시
   - 각 규칙의 구현 방법 및 검증 내용 추가

6. **정렬 로직 코드 추가** (BR-019)
   - TodoService.getTodosByUser() 정렬 알고리즘 명세

7. **검증 기준 업데이트** (9.1, 13.6절)
   - 모든 검증 항목 체크박스 완료 표시
   - 구현 완료된 기능 검증 결과 반영

**수정된 내용**:
- 불변식에 실제 필드명 추가 (5.1, 5.2절)
- 상태 전이에 구현 검증 내용 추가 (7.4절)
- 마감일 해상도 구현 상세 추가 (BR-013)

**문서 버전**: v2.0 (Implementation Verified)
**최종 갱신일**: 2026-02-13
**갱신자**: Claude Code (Backend/Frontend Implementation Review)

### 2026-02-10 (v1.0) - 초기 작성
- 도메인 정의 초안 작성
- 핵심 도메인, Aggregate, 비즈니스 규칙 정의
- MVP 수준 보완 규칙 추가

---



