-- 사용자 테이블 생성
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 할 일 테이블 생성
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 이메일 인덱스 (로그인 시 이메일 검색 최적화)
CREATE INDEX idx_users_email ON users(email);

-- 할 일 사용자 ID 인덱스 (사용자별 할 일 조회 최적화)
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- 할 일 마감일 인덱스 (마감일 기준 정렬 최적화)
CREATE INDEX idx_todos_due_date ON todos(due_date);

-- 할 일 완료 상태 인덱스 (완료 상태 필터링 최적화)
CREATE INDEX idx_todos_is_completed ON todos(is_completed);

-- 할 일 사용자 및 완료 상태 복합 인덱스 (사용자별 완료 상태 조회 최적화)
CREATE INDEX idx_todos_user_completed ON todos(user_id, is_completed);

-- updated_at 컬럼을 자동으로 갱신하는 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- users 테이블에 updated_at 자동 갱신 트리거 생성
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- todos 테이블에 updated_at 자동 갱신 트리거 생성
CREATE TRIGGER update_todos_updated_at
BEFORE UPDATE ON todos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();