import { todoApi } from './api';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

/**
 * Todo Service
 *
 * Todo 관련 비즈니스 로직을 처리하는 서비스 계층
 * - todoApi를 래핑하여 일관된 인터페이스 제공
 * - 에러 처리 및 응답 데이터 추출
 */
export const todoService = {
  /**
   * 모든 할 일 목록 조회
   *
   * @returns Promise<Todo[]> - 할 일 배열
   * @throws ErrorResponse - API 에러 발생 시
   *
   * @example
   * const todos = await todoService.getTodos();
   * console.log(todos.length);
   */
  getTodos: async (): Promise<Todo[]> => {
    const response = await todoApi.getTodos();
    return response.todos;
  },

  /**
   * 새로운 할 일 생성
   *
   * @param data - 할 일 생성 정보 (title 필수)
   * @returns Promise<Todo> - 생성된 할 일
   * @throws ErrorResponse - 제목 누락 또는 API 에러 시
   *
   * @example
   * const todo = await todoService.createTodo({
   *   title: '장보기',
   *   description: '우유, 빵',
   *   due_date: '2026-02-15'
   * });
   */
  createTodo: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await todoApi.createTodo(data);
    return response.todo;
  },

  /**
   * 할 일 수정
   *
   * @param id - 할 일 ID
   * @param data - 수정할 정보 (부분 업데이트 가능)
   * @returns Promise<Todo> - 수정된 할 일
   * @throws ErrorResponse - 없는 ID 또는 권한 없음 시
   *
   * @example
   * const updated = await todoService.updateTodo(1, {
   *   is_completed: true
   * });
   */
  updateTodo: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    const response = await todoApi.updateTodo(id, data);
    return response.todo;
  },

  /**
   * 할 일 삭제
   *
   * @param id - 할 일 ID
   * @returns Promise<void>
   * @throws ErrorResponse - 없는 ID 또는 권한 없음 시
   *
   * @example
   * await todoService.deleteTodo(1);
   */
  deleteTodo: async (id: number): Promise<void> => {
    await todoApi.deleteTodo(id);
    // void 반환 (응답 메시지 무시)
  },
};
