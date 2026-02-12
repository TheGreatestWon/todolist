import React from 'react';
import type { Todo } from '../../types/todo.types';
import styles from './TodoItem.module.css';

/**
 * TodoItem Props
 */
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
}

/**
 * 할 일 항목 컴포넌트
 *
 * 기능:
 * - 완료 체크박스
 * - 제목, 설명, 마감일 표시
 * - 편집 버튼, 삭제 버튼
 * - 완료된 할 일: 취소선, 회색 처리
 * - 기한 경과 할 일: 빨간색 강조
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleToggle = () => {
    onToggle(todo.id, { is_completed: !todo.is_completed });
  };

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      onDelete(todo.id);
    }
  };

  // 마감일이 오늘보다 이전이고 미완료 상태인 경우 기한 경과
  const isOverdue =
    !todo.is_completed &&
    todo.due_date &&
    new Date(todo.due_date) < new Date();

  // 마감일이 오늘인 경우
  const isToday =
    !todo.is_completed &&
    todo.due_date &&
    new Date(todo.due_date).toDateString() === new Date().toDateString();

  // CSS 클래스 결정
  const itemClassName = [
    styles.todoCard,
    todo.is_completed ? styles.completed : '',
    isOverdue ? styles.overdue : '',
    isToday ? styles.today : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClassName}>
      <div className={styles.todoCardContent}>
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={handleToggle}
          className={styles.checkbox}
          aria-label={todo.is_completed ? "할 일 미완료로 표시" : "할 일 완료로 표시"}
        />
        <div className={styles.todoDetails}>
          <h3 className={styles.todoTitle}>{todo.title}</h3>
          {todo.description && (
            <p className={styles.todoDescription}>{todo.description}</p>
          )}
          {todo.due_date && (
            <span className={`${styles.dateBadge} ${isOverdue ? styles.overdue : ''} ${isToday ? styles.today : ''}`}>
              📅 {new Date(todo.due_date).toISOString().split('T')[0]}
            </span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {onEdit && (
          <button
            className={styles.actionButton}
            onClick={() => onEdit(todo.id)}
            aria-label="할 일 편집"
          >
            ✏️
          </button>
        )}
        <button
          className={styles.actionButton}
          onClick={handleDelete}
          aria-label="할 일 삭제"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default TodoItem;