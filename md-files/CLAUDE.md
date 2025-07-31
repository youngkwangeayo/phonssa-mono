# PHONSSA Frontend 구현 문서

## 프로젝트 개요
PHONSSA는 AI 기반 스마트폰 추천 시스템으로, 사용자가 자연어로 요구사항을 입력하면 실제 단가표 데이터를 기반으로 최적의 스마트폰과 요금제를 추천해주는 웹 애플리케이션입니다.

## 🏗️ Frontend 구조 및 구현 내용

### 프로젝트 구조
```
frontend/
├── public/                 # 정적 파일
│   └── index.html         # 메인 HTML 파일
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Admin/         # 관리자 기능 컴포넌트
│   │   │   ├── DataManagementSection.tsx    # 데이터 관리 섹션
│   │   │   ├── FileUploadSection.tsx        # 파일 업로드 섹션
│   │   │   └── StatisticsSection.tsx        # 통계 섹션
│   │   ├── Chat/          # 채팅 관련 컴포넌트
│   │   │   ├── ChatInput.tsx               # 메시지 입력 컴포넌트
│   │   │   ├── ChatInterface.tsx           # 메인 채팅 인터페이스
│   │   │   ├── MessageBubble.tsx           # 메시지 말풍선
│   │   │   └── ProductRecommendationCard.tsx # 제품 추천 카드
│   │   └── Layout/        # 레이아웃 컴포넌트
│   │       ├── MainLayout.tsx              # 메인 레이아웃
│   │       └── Sidebar.tsx                 # 사이드바
│   ├── hooks/             # 커스텀 훅
│   │   └── useChat.ts     # 채팅 기능 훅
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── AdminPage.tsx      # 관리자 페이지
│   │   ├── ChatPage.tsx       # 채팅 페이지
│   │   └── ProductListPage.tsx # 제품 목록 페이지
│   ├── services/          # API 서비스 및 WebSocket
│   │   ├── api.ts         # REST API 클라이언트
│   │   └── websocket.ts   # WebSocket 서비스
│   ├── types/             # TypeScript 타입 정의
│   │   └── index.ts       # 공통 타입 정의
│   ├── utils/             # 유틸리티 함수
│   │   └── index.ts       # 공통 유틸리티
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── index.css          # 글로벌 스타일
│   └── index.tsx          # 앱 진입점
├── package.json           # 의존성 및 스크립트
└── tsconfig.json         # TypeScript 설정
```

### 🛠️ 기술 스택
- **React 18.2.0** - 메인 프론트엔드 프레임워크
- **TypeScript 4.9.5** - 정적 타입 검사
- **Styled Components 5.3.9** - CSS-in-JS 스타일링
- **React Router DOM 6.10.0** - 클라이언트 사이드 라우팅
- **Axios 1.3.4** - HTTP 클라이언트
- **Socket.io-client 4.6.1** - 실시간 WebSocket 통신

## 📱 주요 기능 구현

### 1. 채팅 인터페이스 (`src/components/Chat/`)

#### ChatInterface.tsx - 메인 채팅 화면
- **웰컴 메시지**: 사용자 친화적인 시작 화면
- **샘플 질문**: 4개의 예시 질문으로 사용법 안내
- **실시간 메시지**: 사용자와 AI 메시지 실시간 표시
- **자동 스크롤**: 새 메시지 시 자동으로 하단 스크롤
- **로딩 상태**: AI 응답 대기 중 로딩 애니메이션

```typescript
const sampleQuestions = [
  "70만원 정도의 아이폰을 보고 싶어요",
  "최신 아이폰을 가장 싸게 사고 싶어요", 
  "공시지원금 높은 모델 추천해줘",
  "삼성 갤럭시 S24 시리즈 보여줘"
];
```

#### MessageBubble.tsx - 메시지 표시 컴포넌트
- 사용자/AI 메시지 구분 스타일링
- 제품 추천 카드 통합 표시
- 시간 정보 표시

#### ChatInput.tsx - 메시지 입력 컴포넌트
- Enter 키 전송 지원
- 빈 메시지 전송 방지
- 전송 중 입력 비활성화

#### ProductRecommendationCard.tsx - 제품 추천 카드
- 제품 정보 시각화
- 가격 정보 (정가/할인가)
- 유사도 점수 표시

### 2. 관리자 대시보드 (`src/pages/AdminPage.tsx`)

#### 탭 기반 인터페이스
- **파일 업로드 탭**: 단가표 파일 업로드 기능
- **데이터 관리 탭**: 제품/요금제 데이터 CRUD
- **통계 탭**: 사용량 및 성과 지표 표시

#### 주요 특징
- 반응형 디자인으로 모바일/데스크톱 지원
- 직관적인 탭 네비게이션
- 각 기능별 독립 컴포넌트 구조

### 3. 커스텀 훅 (`src/hooks/useChat.ts`)

#### 핵심 기능
- **이중 통신 방식**: WebSocket 우선, REST API 폴백
- **세션 관리**: 채팅 세션 생성 및 복구
- **실시간 상태**: 연결 상태 및 메시지 동기화
- **오류 처리**: 자동 재시도 및 오류 복구
- **메시지 관리**: 메시지 히스토리 유지

```typescript
interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
}
```

### 4. API 서비스 (`src/services/`)

#### api.ts - REST API 클라이언트
**주요 기능**:
- Axios 인스턴스 기반 HTTP 클라이언트
- JWT 토큰 자동 관리 (인터셉터)
- 토큰 만료 시 자동 로그아웃
- 타입 안전성을 위한 Generic 활용

**API 엔드포인트**:
- 제품 관리: `getProducts`, `createProduct`, `updateProduct`, `deleteProduct`
- 요금제 관리: `getPlans`, `getPlan`
- 채팅: `sendChatMessage`, `getChatSessions`, `getChatSession`
- 파일 업로드: `uploadFile`, `getUploadStatus`
- 통계: `getStatistics`, `getChartData`
- 인증: `login`, `logout`, `getCurrentUser`

#### websocket.ts - 실시간 통신
- Socket.io 기반 양방향 통신
- 연결 상태 모니터링
- 채팅 룸 관리
- 이벤트 기반 메시지 처리

### 5. 타입 정의 (`src/types/index.ts`)

#### 핵심 인터페이스
```typescript
interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  discount_price?: number;
  discount_rate?: number;
  stock_quantity: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  specs?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendations?: ProductRecommendation[];
}

interface ProductRecommendation {
  product_id: number;
  name: string;
  price: number;
  discount_price?: number;
  similarity_score: number;
  reason: string;
}
```

## 🎨 UI/UX 설계

### 디자인 시스템
- **색상 체계**: 
  - Primary: #3498db (메인 브랜드)
  - Secondary: #2c3e50 (텍스트)
  - Background: #f5f5f5 (배경)
- **타이포그래피**: 시스템 폰트 기반 읽기 쉬운 글꼴
- **간격**: 8px 기본 단위의 일관된 spacing
- **반응형**: 모바일 우선 설계

### 컴포넌트 스타일링
```typescript
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
`;

const MessageBubble = styled.div<{ type: 'user' | 'assistant' }>`
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 18px;
  background-color: ${props => 
    props.type === 'user' ? '#3498db' : '#f1f3f4'
  };
  color: ${props => 
    props.type === 'user' ? 'white' : '#2c3e50'
  };
`;
```

## 🔧 주요 구현 특징

### 1. 실시간 통신 아키텍처
- **WebSocket 우선**: 실시간 채팅 경험
- **REST API 폴백**: 연결 실패 시 대안
- **자동 재연결**: 네트워크 끊김 대응
- **세션 복구**: 대화 연속성 보장

### 2. 상태 관리
- React 내장 hooks 활용
- Context API로 전역 상태 관리
- 커스텀 훅으로 비즈니스 로직 분리
- 메모이제이션으로 성능 최적화

### 3. 타입 안전성
- TypeScript strict 모드
- 모든 API 응답 타입 정의
- Generic을 활용한 재사용 가능한 타입
- 컴파일 타임 오류 방지

### 4. 성능 최적화
- React.memo로 불필요한 리렌더링 방지
- useMemo/useCallback으로 계산 최적화
- 코드 스플리팅으로 번들 크기 최적화
- 이미지 lazy loading

### 5. 보안
- JWT 토큰 기반 인증
- XSS 방지를 위한 입력 검증
- HTTPS 통신 강제
- 토큰 자동 갱신

## 🚀 개발/배포 설정

### 스크립트
```json
{
  "start": "react-scripts start",    // 개발 서버 (포트 3000)
  "build": "react-scripts build",    // 프로덕션 빌드
  "test": "react-scripts test",      // 테스트 실행
  "eject": "react-scripts eject"     // CRA 설정 추출
}
```

### 환경 변수
- `REACT_APP_API_BASE_URL`: API 서버 주소
- `REACT_APP_WS_BASE_URL`: WebSocket 서버 주소

### 의존성 관리
- **프로덕션**: React 생태계 핵심 라이브러리만 포함
- **개발**: TypeScript 타입 정의 추가
- **번들 최적화**: Tree shaking으로 사용하지 않는 코드 제거

## 🧪 테스트 전략

### 컴포넌트 테스트
- React Testing Library 활용
- 사용자 인터랙션 중심 테스트
- 접근성 테스트 포함

### API 서비스 테스트
- Mock을 활용한 유닛 테스트
- 에러 시나리오 테스트
- 토큰 관리 테스트

### E2E 테스트 준비
- 사용자 시나리오 기반 테스트
- 주요 기능 플로우 검증

## 🔄 향후 개선 계획

### PWA 지원
- Service Worker 도입
- 오프라인 모드 지원
- 앱다운 설치 기능

### 접근성 개선
- 스크린 리더 지원 강화
- 키보드 내비게이션 개선
- WCAG 2.1 AA 준수

### 사용자 경험 향상
- 다크 모드 테마
- 다국어 지원 (i18n)
- 개인화 설정
- 향상된 검색/필터링

### 성능 최적화
- Virtual Scrolling (대량 데이터)
- 이미지 최적화
- CDN 활용
- 캐싱 전략 개선

---

## 📋 문서 관리 전략 (2025-07-31 업데이트)

### 🗂️ MD 파일 구조 및 역할

#### 프로젝트 문서화 체계
```
md-files/
├── PROJECT.md              # 프로젝트 전체 개요 및 설계
├── CLAUDE.md               # Claude AI 작업 내역 총괄 (현재 파일)
├── CLAUDE.FRONTEND.md      # Frontend 개발 작업 내역
├── CLAUDE.BACKEND.md       # Backend 개발 작업 내역 (예정)
├── CLAUDE.AI-SERVICE.md    # AI Service 개발 작업 내역 (예정)
├── CLAUDE.DATABASE.md      # Database 설정 및 관리 작업 내역 (예정)
├── CLAUDE.INFRA.md         # Infrastructure 및 DevOps 작업 내역 (예정)
└── [기타 시나리오 및 기술 문서들]
```

#### 문서별 역할 정의

##### 📖 PROJECT.md
- **역할**: 프로젝트 전체 개요, 아키텍처, 기술 스택 정의
- **내용**: 시스템 설계, 개발 계획, 인프라 구성
- **업데이트**: 주요 아키텍처 변경 시
- **관리자**: 프로젝트 매니저 / 아키텍트

##### 🤖 CLAUDE.md
- **역할**: Claude AI 작업 내역 총괄 관리
- **내용**: 서버별 작업 현황, 문서 관리 전략, 전체 진행 상황
- **업데이트**: 새로운 서버 작업 시작/완료 시
- **관리자**: Claude AI

##### 🖥️ CLAUDE.FRONTEND.md  
- **역할**: Frontend 개발 전용 작업 내역
- **내용**: React 컴포넌트, 스타일링, 상태 관리, 빌드/배포
- **업데이트**: Frontend 관련 작업 수행 시
- **관리자**: Frontend 개발 담당

##### 🛠️ CLAUDE.BACKEND.md (예정)
- **역할**: Backend API 개발 작업 내역  
- **내용**: NestJS 구현, API 엔드포인트, 비즈니스 로직
- **업데이트**: Backend 관련 작업 수행 시
- **관리자**: Backend 개발 담당

##### 🧠 CLAUDE.AI-SERVICE.md (예정)
- **역할**: AI 서비스 개발 작업 내역
- **내용**: FastAPI 구현, OpenAI 연동, 벡터 검색
- **업데이트**: AI 서비스 관련 작업 수행 시  
- **관리자**: AI/ML 개발 담당

##### 🗄️ CLAUDE.DATABASE.md (예정)
- **역할**: 데이터베이스 설정 및 관리 작업 내역
- **내용**: MySQL 스키마, Qdrant 설정, Redis 구성
- **업데이트**: 데이터베이스 관련 작업 수행 시
- **관리자**: Database 관리자

##### 🚀 CLAUDE.INFRA.md (예정)
- **역할**: 인프라 및 DevOps 작업 내역
- **내용**: Docker 설정, CI/CD, 모니터링, 배포
- **업데이트**: 인프라 관련 작업 수행 시
- **관리자**: DevOps 엔지니어

### 📝 문서 작성 가이드라인

#### 공통 문서 구조
```markdown
# [서비스명] 개발 작업 내역

## 프로젝트 개요
## 🏗️ 구조 및 구현 내용  
## 🛠️ 기술 스택
## 📱 주요 기능 구현
## 🔧 작업 내역 (날짜별)
### 발견된 문제점 및 해결책
### 테스트 결과
### 현재 상태
### 향후 계획

---
*작성일: YYYY-MM-DD*
*작성자: Claude AI*
*최종 업데이트: YYYY-MM-DD*
```

#### 업데이트 규칙
1. **작업 전**: 현재 상황 분석 및 목표 설정
2. **작업 중**: 주요 변경사항 실시간 기록
3. **작업 후**: 결과 정리 및 다음 단계 계획
4. **문제 발생**: 문제점, 해결책, 학습 내용 상세 기록

#### 크로스 레퍼런스
- 서버 간 연동 작업 시 관련 문서에 상호 참조 추가
- 공통 컴포넌트/라이브러리는 해당하는 모든 문서에서 언급
- 의존성 변경 시 영향 받는 모든 서버 문서 업데이트

### 🔄 작업 진행 현황

#### ✅ 완료된 작업
- **Frontend (CLAUDE.FRONTEND.md)**: 초기 구현 완료, 빌드/실행 정상화

#### 🚧 진행 예정 작업  
- **Backend (CLAUDE.BACKEND.md)**: NestJS 기반 API 서버 구현
- **AI Service (CLAUDE.AI-SERVICE.md)**: FastAPI 기반 AI 추천 서비스
- **Database (CLAUDE.DATABASE.md)**: MySQL, Qdrant, Redis 설정
- **Infrastructure (CLAUDE.INFRA.md)**: Docker, CI/CD 구성

---

### 📄 서버별 작업 내역 링크

- 🖥️ **[Frontend 작업 내역](./CLAUDE.FRONTEND.md)** - React 기반 웹 인터페이스
- 🛠️ **Backend 작업 내역** - NestJS API 서버 (예정)
- 🧠 **AI Service 작업 내역** - FastAPI AI 추천 엔진 (예정)  
- 🗄️ **Database 작업 내역** - 데이터베이스 구성 (예정)
- 🚀 **Infrastructure 작업 내역** - DevOps 및 배포 (예정)

---

*작성일: 2025-07-31*  
*작성자: Claude AI*  
*문서 전략 수립: 2025-07-31*
