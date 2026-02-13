# Backend 지침

## 기술 제약
- pg 라이브러리 사용 (Prisma 사용 금지)
- CORS는 환경변수(CORS_ORIGIN)로 관리

## 아키텍처
- Clean Architecture 3-Layer: Routes → Services → Repositories
- SOLID 원칙 준수
