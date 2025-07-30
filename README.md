# 📱 Phonssa AI 제품 추천 시스템

AI 기반의 스마트폰 요금제/제품 추천 시스템입니다.  
사용자 요청을 AI가 분석하고, 실제 요금제/가맹점 정보를 기반으로 최적의 기기를 추천합니다.

---

## 🚀 주요 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React |
| 백엔드 API | NestJS (TypeScript) |
| AI 처리 | FastAPI (Python) + OpenAI API |
| 메시지 큐 | Redis Streams |
| 정형 데이터베이스 | MySQL |
| 벡터 데이터베이스 | Qdrant |
| 기타 | Redis (옵션 - 캐시/세션 등) |

---

## 🧱 아키텍처 구성

[React (Frontend)]
↓ REST/WebSocket
[NestJS (Backend API)]
↓ ↘
[MySQL (RDBMS)] [Redis Streams (MQ)]
↓
[FastAPI (AI 처리 서버 - Python)]
↓
[Qdrant (벡터 DB)]


---

## 📌 주요 기능

- 사용자 요청을 AI가 분석하여 요금제/기기 추천
- 단가표 및 요금제 데이터를 기반으로 실제 조건 필터링
- 벡터 검색(Qdrant)을 통해 유사 제품 조건 탐색
- Redis 기반 비동기 처리로 빠르고 안정적인 응답 제공

---

## 📁 프로젝트 구조

- `/frontend` - React 앱
- `/backend` - NestJS API 서버
- `/ai-service` - FastAPI 기반 AI 처리 서버
- `/db` - 마이그레이션 및 초기 데이터
- `/infra` - Redis, Qdrant 등 Docker 설정

---

## 🧪 테스트 및 개발

- 로컬 테스트: `docker-compose up` 지원 예정
- 각 서비스는 `.env`로 구성 설정 분리
- AI 서버는 OpenAI API Key 필요

---

## 🔐 License

MIT License