# Phonssa Frontend

AI 기반 스마트폰 제품 추천 시스템의 React 프론트엔드 애플리케이션입니다.

## 🚀 주요 기능

- **AI 채팅 인터페이스**: 자연어로 제품 추천 요청
- **실시간 통신**: WebSocket을 통한 실시간 AI 응답
- **제품 관리**: 제품 목록 조회 및 필터링
- **관리자 대시보드**: 파일 업로드, 데이터 관리, 통계 조회
- **반응형 디자인**: 모바일부터 데스크톱까지 지원

## 🛠️ 기술 스택

- **Framework**: React 18 + TypeScript
- **Styling**: Styled Components
- **상태 관리**: Context API
- **HTTP Client**: Axios
- **실시간 통신**: Socket.IO Client
- **라우팅**: React Router DOM
- **빌드 도구**: Create React App

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Layout/         # 레이아웃 컴포넌트
│   ├── Chat/           # 채팅 관련 컴포넌트
│   └── Admin/          # 관리자 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── services/           # API 및 WebSocket 서비스
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── App.tsx            # 메인 애플리케이션
```

## 🏃‍♂️ 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 설정을 수정하세요:

```bash
cp .env.example .env
```

### 3. 개발 서버 실행

```bash
npm start
```

애플리케이션이 http://localhost:3000에서 실행됩니다.

## 🌐 API 통신

### REST API

`src/services/api.ts`에서 백엔드 API와의 통신을 관리합니다:

- 제품 CRUD 작업
- 채팅 세션 관리
- 파일 업로드
- 통계 데이터 조회
- 사용자 인증

### WebSocket

`src/services/websocket.ts`에서 실시간 통신을 관리합니다:

- 실시간 채팅
- 파일 업로드 진행상황
- 시스템 알림

## 🎨 컴포넌트 가이드

### ChatInterface

메인 채팅 인터페이스로 사용자와 AI 간의 대화를 관리합니다.

```tsx
import ChatInterface from '@/components/Chat/ChatInterface';

<ChatInterface />
```

### ProductRecommendationCard

AI 추천 결과를 카드 형태로 표시합니다.

```tsx
import ProductRecommendationCard from '@/components/Chat/ProductRecommendationCard';

<ProductRecommendationCard recommendation={recommendation} />
```

### AdminPage

관리자 기능을 제공하는 대시보드 페이지입니다.


```tsx
import AdminPage from '@/pages/AdminPage';

<AdminPage />
```

## 🔧 커스텀 훅

### useChat

채팅 기능을 관리하는 훅입니다:

```tsx
import { useChat } from '@/hooks/useChat';

const {
  messages,
  isLoading,
  error,
  sendMessage,
  clearMessages
} = useChat({
  userId: 'user123',
  enableWebSocket: true
});
```

## 📱 반응형 디자인

- **모바일**: 320px ~ 768px
- **태블릿**: 768px ~ 1024px
- **데스크톱**: 1024px ~

모든 컴포넌트는 반응형으로 설계되어 있으며, Styled Components의 미디어 쿼리를 활용합니다.

## 🎯 주요 페이지

### 메인 채팅 페이지 (/)

- AI와의 자연어 대화
- 제품 추천 결과 표시
- 실시간 응답

### 제품 목록 페이지 (/products)

- 제품 테이블 형태 조회
- 필터링 및 검색
- 정렬 기능

### 관리자 페이지 (/admin)

- 파일 업로드
- 데이터 관리
- 통계 대시보드

## 🔒 보안

- JWT 토큰 기반 인증
- 자동 토큰 갱신
- CORS 설정
- XSS 방지

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run serve
```

## 🚀 성능 최적화

- React.memo를 통한 컴포넌트 최적화
- lazy loading을 통한 코드 분할
- 이미지 및 파일 최적화
- 번들 크기 최적화

## 🐛 디버깅

개발 모드에서 Redux DevTools와 React Developer Tools를 사용할 수 있습니다.

```bash
# 디버그 모드로 실행
REACT_APP_DEBUG=true npm start
```

## 📝 코딩 컨벤션

- **파일명**: PascalCase (컴포넌트), camelCase (유틸리티)
- **컴포넌트**: 함수형 컴포넌트 + hooks 사용
- **스타일링**: Styled Components 사용
- **타입**: TypeScript 엄격 모드 활용

## 🤝 기여하기

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 라이선스

This project is licensed under the MIT License.