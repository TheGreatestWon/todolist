import React, { useState } from 'react';
import Modal from '../common/Modal/Modal';
import TodoForm from '../todo/TodoForm';
import Button from '../common/Button/Button';
import type { Todo } from '../../types/todo.types';
import type { UpdateTodoDto } from '../../types/todo.types';

interface TodoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSubmit: (id: number, data: UpdateTodoDto) => void;
}

const TodoEditModal: React.FC<TodoEditModalProps> = ({ isOpen, onClose, todo, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: UpdateTodoDto) => {
    if (!todo) return;
    
    setIsLoading(true);
    try {
      await onSubmit(todo.id, data);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
      <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
        취소
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 수정"
      footer={footer}
      size="md"
    >
      {todo ? (
        <TodoForm 
          onSubmit={handleSubmit}
          initialData={{
            title: todo.title,
            description: todo.description || '',
            due_date: todo.due_date || ''
          }}
        />
      ) : (
        <div>할 일을 불러오는 중...</div>
      )}
    </Modal>
  );
};

export default TodoEditModal;