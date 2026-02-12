import { useState, useEffect } from 'react';
import { todoService } from '../services/todo.service';
import { Todo, CreateTodoDto } from '../types/todo.types';

/**
 * useTodos Hook
 *
 * 할 일 관련 상태와 API 호출 함수들을 제공하는 커스텀 훅
 * - 상태: todos, loading, error
 * - 함수: fetchTodos, createTodo, updateTodo, deleteTodo, toggleComplete
 * - 자동으로 fetchTodos 실행 (useEffect)
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 할 일 목록 가져오기
   */
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getTodos();
      setTodos(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일 목록을 가져오는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 새로운 할 일 생성
   */
  const createTodo = async (data: CreateTodoDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.createTodo(data);
      setTodos(prev => [...prev, response]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일을 생성하는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 할 일 업데이트
   */
  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.updateTodo(id, updates);

      setTodos(prev =>
        prev.map(todo => (todo.id === id ? response : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일을 업데이트하는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 할 일 삭제
   */
  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일을 삭제하는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 할 일 완료/미완료 토글
   */
  const toggleComplete = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { is_completed: !todo.is_completed });
    }
  };

  // 컴포넌트 마운트 시 할 일 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
};