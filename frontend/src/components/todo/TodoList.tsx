import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '../../types/todo.types';
import styles from './TodoList.module.css';

/**
 * TodoList Props
 */
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
  className?: string;
  showCompletedToggle?: boolean; // 완료된 할 일 섹션의 접기/펼치기 버튼 표시 여부
}

/**
 * 할 일 목록 컴포넌트
 *
 * 기능:
 * - 할 일 목록 렌더링 (TodoItem 사용)
 * - 할 일 없을 때 "할 일이 없습니다" 메시지
 */
const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  className = '',
  showCompletedToggle = true // 기본값은 true로 기존 동작 유지
}) => {
  const listClassName = [styles.list, className].filter(Boolean).join(' ');

  // 할 일 항목을 렌더링하는 함수
  const renderTodoItems = (todoList: Todo[]) => {
    if (todoList.length === 0) {
      return (
        <div className={styles.emptySection}>
          <p>할 일이 없습니다</p>
        </div>
      );
    }

    return todoList.map((todo) => (
      <li key={todo.id} className={styles.listItem}>
        <TodoItem
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          {...(onEdit ? { onEdit } : {})}
        />
      </li>
    ));
  };

  return (
    <div className={styles.container}>
      <ul className={listClassName}>
        {renderTodoItems(todos)}
      </ul>
    </div>
  );
};

export default TodoList;