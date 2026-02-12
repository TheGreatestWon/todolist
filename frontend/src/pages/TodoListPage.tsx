import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/todo/TodoList';
import TodoModal from '../components/todo/TodoModal';
import TodoEditModal from '../components/todo/TodoEditModal';
import Button from '../components/common/Button/Button';
import type { Todo } from '../types/todo.types';
import styles from './TodoListPage.module.css';

/**
 * TodoListPage Component
 *
 * 할 일 목록 페이지 (메인 페이지)
 * - 헤더 영역 (앱 제목, 사용자 이메일, 로그아웃 버튼)
 * - TodoForm 컴포넌트 (할 일 추가)
 * - 미완료 할 일 목록 (기한 경과, 오늘, 예정된 할 일 섹션)
 * - 완료된 할 일 섹션 (접기/펼치기 기능)
 * - useTodos 훅 사용
 * - useAuth 훅 사용
 * - 인증되지 않은 사용자 접근 시 로그인 페이지로 리다이렉트
 */
const TodoListPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { todos, loading, error, createTodo, updateTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();

  // 완료된 할 일 섹션의 접기/펼치기 상태
  const [showCompleted, setShowCompleted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // 인증되지 않은 사용자 접근 시 로그인 페이지로 리다이렉트
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleAddTodoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTodoClick = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setEditingTodo(todo);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  // 할 일 분류
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize to start of day

  const overdueTodos = todos.filter(todo =>
    !todo.is_completed &&
    todo.due_date &&
    (() => {
      const due = new Date(todo.due_date);
      due.setHours(0, 0, 0, 0); // Normalize to start of day
      return due < currentDate;
    })()
  );

  const todayTodos = todos.filter(todo =>
    !todo.is_completed &&
    todo.due_date &&
    (() => {
      const due = new Date(todo.due_date);
      due.setHours(0, 0, 0, 0); // Normalize to start of day
      return due.getTime() === currentDate.getTime();
    })()
  );

  const upcomingTodos = todos.filter(todo =>
    !todo.is_completed &&
    todo.due_date &&
    (() => {
      const due = new Date(todo.due_date);
      due.setHours(0, 0, 0, 0); // Normalize to start of day
      return due > currentDate;
    })()
  );

  const noDeadlineTodos = todos.filter(todo => 
    !todo.is_completed && 
    !todo.due_date
  );

  const completedTodos = todos.filter(todo => 
    todo.is_completed
  );

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header 영역 */}
      <header className={styles.header}>
        <h1 className={styles.appTitle}>할 일 관리</h1>
        <span className={styles.userEmail}>{user?.email}</span>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </header>

      {/* 할 일 추가 버튼 */}
      <section className={styles.addTodoSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>할 일 목록</h2>
          <Button variant="primary" onClick={handleAddTodoClick}>
            새 할 일 추가
          </Button>
        </div>
      </section>

      {/* 할 일 추가 모달 */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={createTodo}
      />

      {/* 할 일 수정 모달 */}
      <TodoEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        todo={editingTodo}
        onSubmit={updateTodo}
      />

      {/* 미완료 할 일 목록 */}
      <section className={styles.todosSection}>
        {/* 기한 경과 섹션 */}
        {overdueTodos.length > 0 && (
          <div className={styles.todoCategory}>
            <h3 className={styles.categoryTitle}>
              🔴 기한 경과 ({overdueTodos.length})
            </h3>
            <TodoList
              todos={overdueTodos}
              onToggle={updateTodo}
              onDelete={deleteTodo}
              onEdit={handleEditTodoClick}
            />
          </div>
        )}

        {/* 오늘 할 일 섹션 */}
        {todayTodos.length > 0 && (
          <div className={styles.todoCategory}>
            <h3 className={styles.categoryTitle}>
              🟠 오늘 ({todayTodos.length})
            </h3>
            <TodoList
              todos={todayTodos}
              onToggle={updateTodo}
              onDelete={deleteTodo}
              onEdit={handleEditTodoClick}
            />
          </div>
        )}

        {/* 예정된 할 일 섹션 */}
        {upcomingTodos.length > 0 && (
          <div className={styles.todoCategory}>
            <h3 className={styles.categoryTitle}>
              📌 예정 ({upcomingTodos.length})
            </h3>
            <TodoList
              todos={upcomingTodos}
              onToggle={updateTodo}
              onDelete={deleteTodo}
              onEdit={handleEditTodoClick}
            />
          </div>
        )}

        {/* 마감일 없는 할 일 섹션 */}
        {noDeadlineTodos.length > 0 && (
          <div className={styles.todoCategory}>
            <h3 className={styles.categoryTitle}>
              📋 마감일 없음 ({noDeadlineTodos.length})
            </h3>
            <TodoList
              todos={noDeadlineTodos}
              onToggle={updateTodo}
              onDelete={deleteTodo}
              onEdit={handleEditTodoClick}
            />
          </div>
        )}
      </section>

      {/* 예정/완료 구분선 */}
      <div className={styles.divider}></div>

      {/* 완료된 할 일 섹션 */}
      <section className={styles.completedSection}>
        <h3 className={styles.categoryTitle}>
          ✅ 완료 ({completedTodos.length})
          <button
            className={styles.toggleButton}
            onClick={toggleShowCompleted}
          >
            [{showCompleted ? '접기 ▼' : '펼치기 ▶'}]
          </button>
        </h3>
        {showCompleted && (
          <TodoList
            todos={completedTodos}
            onToggle={updateTodo}
            onDelete={deleteTodo}
            onEdit={handleEditTodoClick}
            showCompletedToggle={false} // TodoListPage에서 자체적으로 완료된 항목 섹션을 제어하므로 TodoList의 접기/펼치기 기능은 비활성화
          />
        )}
      </section>
    </div>
  );
};

export default TodoListPage;