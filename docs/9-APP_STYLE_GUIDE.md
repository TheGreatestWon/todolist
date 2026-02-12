# 할 일 관리 시스템 - 스타일 가이드

## 📋 개요
Microsoft To Do 스타일의 미니멀하고 깔끔한 디자인 시스템

---

## 🎨 색상 시스템

### Primary Colors
```css
--primary-red: #E44232;        /* 주요 액션 버튼, 선택된 항목 */
--primary-red-light: #FFE5E3;  /* 호버, 배경 */
--primary-red-dark: #C23527;   /* 액티브 상태 */
```

### Neutral Colors
```css
--white: #FFFFFF;
--gray-50: #FAFAFA;            /* 배경 */
--gray-100: #F5F5F5;           /* 카드 배경 */
--gray-200: #EEEEEE;           /* 구분선 */
--gray-300: #E0E0E0;           /* 비활성 요소 */
--gray-400: #BDBDBD;           /* 보조 텍스트 */
--gray-600: #757575;           /* 아이콘 */
--gray-800: #424242;           /* 본문 텍스트 */
--gray-900: #212121;           /* 제목 텍스트 */
```

### Semantic Colors
```css
--success: #4CAF50;            /* 완료 상태 */
--warning: #FFC107;            /* 오늘 마감 */
--error: #F44336;              /* 기한 초과 */
--info: #2196F3;               /* 정보 */
```

---

## 📐 타이포그래피

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;
```

### Font Sizes
```css
--font-xs: 12px;    /* 보조 정보, 카운트 */
--font-sm: 14px;    /* 본문, 입력 필드 */
--font-md: 16px;    /* 기본 텍스트 */
--font-lg: 20px;    /* 페이지 제목 */
--font-xl: 24px;    /* 메인 제목 */
```

### Font Weights
```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

---

## 🔲 레이아웃

### Spacing Scale
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 24px;
--space-2xl: 32px;
--space-3xl: 48px;
```

### Container Widths
```css
--sidebar-width: 240px;         /* 사이드바 */
--content-max-width: 800px;     /* 메인 컨텐츠 */
```

### Border Radius
```css
--radius-sm: 4px;    /* 버튼, 입력 필드 */
--radius-md: 8px;    /* 카드 */
--radius-lg: 12px;   /* 모달 */
--radius-full: 50%;  /* 원형 버튼 */
```

---

## 🧩 컴포넌트 스타일

### 1. 버튼

#### Primary Button (작업 추가)
```css
.btn-primary {
  background: var(--primary-red);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: var(--weight-semibold);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--primary-red-dark);
}
```

#### Secondary Button (취소, 닫기)
```css
.btn-secondary {
  background: transparent;
  color: var(--gray-800);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  border: 1px solid var(--gray-300);
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--gray-100);
}
```

#### Icon Button
```css
.btn-icon {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--gray-600);
}

.btn-icon:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}
```

### 2. 입력 필드

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  color: var(--gray-900);
  background: white;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary-red);
  box-shadow: 0 0 0 3px var(--primary-red-light);
}

.input::placeholder {
  color: var(--gray-400);
}
```

### 3. 할 일 카드

```css
.todo-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-card:hover {
  border-color: var(--gray-300);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.todo-card.selected {
  border-color: var(--primary-red);
  background: var(--primary-red-light);
}

.todo-card.completed {
  opacity: 0.6;
}

.todo-card.completed .todo-title {
  text-decoration: line-through;
  color: var(--gray-600);
}
```

### 4. 사이드바 네비게이션

```css
.sidebar {
  width: var(--sidebar-width);
  background: var(--gray-50);
  border-right: 1px solid var(--gray-200);
  height: 100vh;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--gray-800);
  font-size: var(--font-sm);
  cursor: pointer;
  border-radius: var(--radius-sm);
  margin: 4px 8px;
  transition: background 0.2s;
}

.nav-item:hover {
  background: var(--gray-100);
}

.nav-item.active {
  background: var(--primary-red-light);
  color: var(--primary-red);
  font-weight: var(--weight-semibold);
}

.nav-item .icon {
  margin-right: 12px;
  font-size: 18px;
}

.nav-item .count {
  margin-left: auto;
  font-size: var(--font-xs);
  color: var(--gray-600);
}
```

### 5. 체크박스

```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-400);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox:hover {
  border-color: var(--primary-red);
}

.checkbox.checked {
  background: var(--primary-red);
  border-color: var(--primary-red);
  position: relative;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 6. 날짜 배지

```css
.date-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  background: var(--gray-100);
  color: var(--gray-700);
}

.date-badge.today {
  background: var(--warning);
  color: white;
}

.date-badge.overdue {
  background: var(--error);
  color: white;
}
```

---

## 🎭 애니메이션

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### 예제
```css
/* 호버 효과 */
transition: all var(--transition-base);

/* 페이드 인 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 슬라이드 업 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📱 반응형 디자인

### Breakpoints
```css
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;
```

### 모바일 우선 접근
```css
/* Mobile First */
.container {
  padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }

  .sidebar {
    display: block; /* 사이드바 표시 */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: var(--content-max-width);
    margin: 0 auto;
  }
}
```

---

## 🔍 아이콘 가이드

### 권장 아이콘 라이브러리
- **Lucide React** (추천)
- React Icons
- Heroicons

### 아이콘 크기
```css
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### 사용 예시
```tsx
import { Plus, Search, Home, Calendar } from 'lucide-react';

<Plus size={20} />      // 버튼 아이콘
<Search size={16} />    // 입력 필드 아이콘
<Home size={18} />      // 네비게이션 아이콘
```

---

## ✅ 접근성 가이드

### 색상 대비
- 본문 텍스트: 최소 4.5:1
- 큰 텍스트: 최소 3:1
- UI 컴포넌트: 최소 3:1

### 키보드 네비게이션
```css
.focusable:focus-visible {
  outline: 2px solid var(--primary-red);
  outline-offset: 2px;
}
```

### ARIA 레이블
```tsx
<button aria-label="할 일 추가">
  <Plus size={20} />
</button>

<input
  type="text"
  placeholder="할 일 추가"
  aria-label="새 할 일 입력"
/>
```

---

## 📦 사용 예시

### React 컴포넌트 예시
```tsx
// TodoCard.tsx
const TodoCard = ({ todo, onToggle, onSelect }) => {
  return (
    <div
      className={`todo-card ${todo.completed ? 'completed' : ''}`}
      onClick={onSelect}
    >
      <div className="todo-card-content">
        <div
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        />
        <div className="todo-details">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          {todo.dueDate && (
            <span className="date-badge">{todo.dueDate}</span>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## 🎯 디자인 원칙

1. **심플함**: 불필요한 요소 제거, 본질에 집중
2. **일관성**: 모든 페이지에서 동일한 패턴 사용
3. **접근성**: 모든 사용자가 쉽게 사용 가능
4. **반응성**: 모든 디바이스에서 최적화된 경험
5. **피드백**: 사용자 액션에 즉각적인 시각적 피드백

---

## 🚀 구현 우선순위

### Phase 1 (MVP)
- [ ] 색상 시스템 적용
- [ ] 타이포그래피 설정
- [ ] 기본 버튼 스타일
- [ ] 입력 필드 스타일
- [ ] 할 일 카드 디자인

### Phase 2
- [ ] 사이드바 네비게이션
- [ ] 애니메이션 효과
- [ ] 반응형 레이아웃

### Phase 3
- [ ] 다크 모드 (선택사항)
- [ ] 커스텀 테마
- [ ] 고급 인터랙션

---

**작성일**: 2026-02-12
**버전**: 1.0.0
**참고**: Microsoft To Do 디자인 시스템 기반
