import React, { useState } from 'react';
import Modal from '../common/Modal/Modal';
import TodoForm from '../todo/TodoForm';
import Button from '../common/Button/Button';
import type { CreateTodoDto, UpdateTodoDto } from '../../types/todo.types';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTodoDto) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateTodoDto | UpdateTodoDto) => {
    setIsLoading(true);
    try {
      // CreateTodoDto 타입으로 캐스팅하여 전달
      await onSubmit(data as CreateTodoDto);
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
      title="새로운 할 일 추가"
      footer={footer}
      size="md"
    >
      <TodoForm onSubmit={handleSubmit} />
    </Modal>
  );
};

export default TodoModal;