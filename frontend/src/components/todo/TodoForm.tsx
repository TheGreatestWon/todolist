import React, { useState } from 'react';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import type { CreateTodoDto, UpdateTodoDto } from '../../types/todo.types';
import styles from './TodoForm.module.css';

/**
 * TodoForm Props
 */
interface TodoFormProps {
  onSubmit: (data: CreateTodoDto | UpdateTodoDto) => void;
  className?: string;
  initialData?: {
    title: string;
    description: string;
    due_date: string;
  };
}

/**
 * 할 일 폼 컴포넌트
 *
 * 기능:
 * - 제목 입력 필드
 * - 설명 입력 필드 (textarea)
 * - 마감일 입력 필드 (date picker)
 * - 입력 검증 (제목 필수)
 * - 제출 후 폼 초기화
 */
const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, className = '', initialData }) => {
  // 마감일 기본값을 오늘 날짜로 설정 (수정 모드가 아닐 경우)
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 (로컬 시간 기준)
  
  // Helper function to get local date string in YYYY-MM-DD format
  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Use the helper function to get today's date
  const todayLocal = getLocalDateString(new Date());
  
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [dueDate, setDueDate] = useState<string>(initialData?.due_date || (initialData ? '' : todayLocal));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 입력 검증
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    // 폼 데이터 제출
    if (initialData) {
      // 수정 모드
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate || undefined,
      } as UpdateTodoDto);
    } else {
      // 추가 모드
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate || undefined,
      } as CreateTodoDto);
    }

    // 폼 초기화 (수정 모드에서는 초기화하지 않음)
    if (!initialData) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  const formClassName = [styles.todoForm, className].filter(Boolean).join(' ');

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <h2 className={styles.formTitle}>
        {initialData ? '할 일 수정' : '새로운 할 일 추가'}
      </h2>

      <div className={styles.formGroup}>
        <Input
          type="text"
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          required
          autoFocus={true}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>설명:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요 (선택)"
          className={styles.textarea}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="dueDate" className={styles.label}>마감일:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.dateInput}
            min={todayLocal} // 오늘 이후의 날짜만 선택 가능
          />
        </div>

        <div className={styles.formGroup}>
          <Button type="submit" variant="primary">
            {initialData ? '수정' : '추가'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;