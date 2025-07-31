# 🧱 기술 스택 및 구성 계획 (Phonssa 프로젝트)

---

## 📦 전체 구성

| 구성 요소 | 기술 |
|------------|------|
| 프론트엔드 | React |
| 백엔드 | NestJS (Node.js + TypeScript) |
| AI 서버 | FastAPI (Python) + OpenAI API |
| 메시지 큐 | Redis Streams |
| 데이터베이스 | MySQL (정형), Qdrant (벡터), Redis (옵션) |

---

## 🎯 각 컴포넌트 역할

### 🖥️ 프론트엔드 (React)
- 사용자 요청 입력 UI
- 추천 결과 출력
- REST 또는 WebSocket 통신

### 🛠 백엔드 (NestJS)
- 사용자/요금제/기기/가맹점 관리
- 요청 저장 및 Redis로 AI 요청 전송
- AI 결과 수신 후 DB 갱신 및 반환

### 🤖 AI 서비스 (FastAPI)
- 사용자 요청 임베딩 처리 (OpenAI)
- Qdrant에서 벡터 기반 유사 제품 검색
- GPT로 자연어 추천 생성

### 📬 메시지 큐 (Redis Streams)
- 비동기 처리 (NestJS → FastAPI)
- AI 처리 병렬화 및 안정성 확보

### 🗃️ 데이터베이스
- **MySQL**: 요금제, 가맹점, 기기 등 관계형 저장
- **Qdrant**: 임베딩 벡터 기반 검색
- **Redis (선택)**: 세션, 캐시, 임시 응답 저장 등

---

## 📌 특징 및 장점

- LLM 기반 제품 추천
- 벡터 검색을 통한 정밀한 조건 매칭
- 구성 요소 분리로 높은 확장성과 유지보수성 확보
- Redis를 통한 빠른 비동기 통신

---

## 🧱 차후 확장 고려

- Kafka 전환 (대규모 트래픽 대응 시)
- MongoDB 추가 (OCR 등 유연한 문서 저장 시)
- 사용자별 장기 기억/이력 관리 (벡터DB 확장)
