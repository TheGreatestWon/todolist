# Personal Todo Management System

개인 사용자를 위한 할 일 관리 웹 애플리케이션

## 프로젝트 개요

간단하고 직관적인 UI로 할 일을 효율적으로 관리할 수 있는 웹 기반 애플리케이션입니다.

## 기술 스택

### Frontend
- React 19
- TypeScript
- Responsive Design (모바일/데스크탑 지원)

### Backend
- Node.js
- Express
- PostgreSQL 17

### 배포
- Vercel

## 핵심 기능

- **사용자 인증**: JWT 기반 회원가입 및 로그인
- **할 일 CRUD**: 할 일 생성, 조회, 수정, 삭제
- **마감일 기반 분류**: 오늘, 예정, 기한 경과 자동 분류
- **완료 처리**: 할 일 완료 상태 토글
- **반응형 UI**: 모바일과 데스크탑 환경 모두 지원

## MVP 목표

**출시 일정**: 이번주 금요일 오후

최소 기능만을 포함한 첫 번째 버전을 빠르게 출시하여 사용자 피드백을 수집합니다.

## 프로젝트 구조

```
todolist/
├── backend/          # Node.js + Express 백엔드 서버
├── frontend/         # React + TypeScript 프론트엔드
├── database/         # 데이터베이스 스키마 및 마이그레이션
├── docs/             # 프로젝트 문서 (API 명세, 실행 계획 등)
├── mockup/           # UI 와이어프레임
└── swagger/          # API 문서 (Swagger)
```

## 시작하기

### 백엔드 실행

```bash
cd backend
npm install
npm run dev
```

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

## 개발 기간

총 3일 (MVP 출시까지)

## 문서

- [데이터베이스 스키마](./database/schema.sql)
- [API 명세서](./swagger/)
- [실행 계획](./docs/execution-plan.md)
- [도메인 정의](./docs/domain-definition.md)
