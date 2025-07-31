# 📱 Phonssa AI 제품 추천 시스템 - 종합 프로젝트 문서

## 📋 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [서비스 기획](#2-서비스-기획)
3. [유저 시나리오](#3-유저-시나리오)
4. [시스템 아키텍처](#4-시스템-아키텍처)
5. [기술 스택](#5-기술-스택)
6. [개발 계획](#6-개발-계획)
7. [인프라 구성](#7-인프라-구성)
8. [개발 문서](#8-개발-문서)

---

## 1. 프로젝트 개요

### 🎯 프로젝트 목표
AI 기반의 스마트폰 요금제/제품 추천 시스템으로, 사용자의 자연어 요청을 분석하여 실제 요금제/가맹점 정보를 기반으로 최적의 기기를 추천하는 서비스

### 🚀 핵심 가치
- **지능형 추천**: OpenAI와 벡터 검색을 활용한 정확한 제품 매칭
- **실시간 데이터**: 실제 단가표와 요금제 정보 기반 추천
- **사용자 친화적**: 자연어 대화형 인터페이스
- **관리 효율성**: 업로드 자동화와 데이터 관리 기능

### 📊 주요 기능
- AI 기반 제품/요금제 추천
- 다양한 형태의 단가표 업로드 및 자동 분석
- 관리자용 데이터 관리 인터페이스
- 실시간 채팅 기반 상담

---

## 2. 서비스 기획

### 🎨 UI/UX 구성

#### 메인 화면
```
┌────────────────────────────┬────────────────────────────────────────────┐
│                            │                                            │
│   ▷ 새 채팅                 │                                             │
│   ▷ 채팅 기록                │    ----------------------------------     │
│   ▷ 표 보기                │    사용자: "70만원대 아이폰 보여줘"       │
│                            │    phonSsa: "iPhone 15, 5G 요금제 추천..."    │
│                            │                                            │
│                            │    [ 🧠 AI가 실제 단가표 기반 추천 ]      │
│                            │                                            │
│                            │      [ 보이스 🎙️  + ➕  ➤ ] 입력창             │
│   ───────────────────────  │                                            │
│   👤 유저 프로필 (이미지)   │                                            │
└────────────────────────────┴────────────────────────────────────────────┘
```

#### 관리자 화면
```
┌─────────────────────────────────────────────────────────────┐
│  📋 상품 단가표 관리                                        │
├─────────────────────────────────────────────────────────────┤
│  🔍 필터 옵션:                                              │
│  [브랜드 ▼] [카테고리 ▼] [가격대 ▼] [재고상태 ▼] [🔍 검색] │
│                                                             │
│  📊 총 1,247개 상품 중 15개 표시                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ID  상품명            정가     할인가   할인율 재고 상태   │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │001 iPhone 16 Pro 256GB 770,000 500,000  35%   25  활성 │ │
│  │002 iPhone 16 128GB     650,000 420,000  35%   40  활성 │ │
│  │003 Galaxy S25 256GB    620,000 480,000  23%   18  활성 │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 타겟 사용자
- **일반 사용자**: 스마트폰 구매를 고려하는 소비자
- **가맹점 직원**: 고객 상담 지원 도구로 활용
- **관리자**: 단가표 및 요금제 데이터 관리

---

## 3. 유저 시나리오

### 📱 시나리오 1: 일반 사용자 AI 추천
**목표**: 자연어 요청으로 최적 제품 추천 받기

**흐름**:
1. 사용자가 자연어로 요청 입력
   - "70만원 정도의 아이폰을 보고 싶어요"
   - "최신 아이폰을 가장 싸게 사고 싶어요"
   - "공시지원금 높은 모델 추천해줘"

2. AI 처리 과정
   - OpenAI Embedding으로 쿼리 벡터화
   - Qdrant에서 조건 유사 제품 검색
   - GPT가 추천 문장 생성

3. 추천 결과 제공
   > "77만원의 최신 아이폰 16 Pro를  
   > 50만원 할인된 금액으로 구매 가능하세요!  
   > A통신사의 5G 스페셜 요금제로 추천드립니다."

### 📂 시나리오 2: 관리자 단가표 업로드
**목표**: 다양한 형태의 단가표 자동 분석 및 DB 저장

**흐름**:
1. 파일 업로드 (`.jpg`, `.png`, `.txt`, `.xlsx`, `.csv`)
2. AI 자동 분석
   - 이미지: OCR 처리
   - 텍스트: 자연어 파싱
   - 엑셀: 셀 구조 기반 정형화
3. 정규화된 데이터 MySQL 저장
4. 관리자 검수 및 수정 가능

### 🗂 시나리오 3: 관리자 데이터 확인
**목표**: 업로드된 단가표 확인 및 관리

**흐름**:
1. 표 형태로 데이터 렌더링
2. 필터링/정렬/검색 기능 활용
3. 데이터 직접 수정 가능
4. 변경 이력 로그 저장

---

## 4. 시스템 아키텍처

### 🏗️ 전체 아키텍처
```
[React Frontend]
        ↓ REST/WebSocket
[NestJS Backend API]
        ↓ ↘
[MySQL RDBMS] [Redis Streams MQ]
        ↓
[FastAPI AI Server]
        ↓
[Qdrant Vector DB]
```

### 🔄 서비스 간 통신 흐름
1. **Frontend → Backend**: REST API/WebSocket
2. **Backend → AI Service**: Redis Streams (비동기)
3. **AI Service → Vector DB**: 벡터 검색
4. **AI Service → OpenAI**: 임베딩/GPT 처리
5. **Backend ↔ MySQL**: 정형 데이터 CRUD

### 📦 마이크로서비스 구성

#### 🖥️ Frontend Service (React)
**주요 역할:**
- 사용자 인터페이스 제공
- 채팅 기반 제품 추천 UI
- 관리자 단가표 관리 대시보드
- 실시간 채팅 인터페이스 (Socket.io)
- 파일 업로드 UI
- 추천 결과 시각화

**핵심 기능:**
- 사용자 인증/로그인 UI
- 채팅 메시지 입력/출력
- 단가표 업로드 인터페이스
- 제품/요금제 목록 표시
- 필터링/검색/정렬 UI
- 관리자 데이터 CRUD 인터페이스

#### 🛠️ Backend Service (NestJS)
**주요 역할:**
- 비즈니스 로직 처리
- 사용자 인증/권한 관리
- 데이터베이스 CRUD 연산
- AI 서비스와의 통신 중재
- 파일 업로드 처리
- API Gateway 역할

**핵심 기능:**
- JWT 기반 사용자 인증
- 제품/요금제/가맹점 데이터 관리
- 채팅 세션 관리
- Redis Streams를 통한 AI 요청 전송
- AI 결과 수신 및 DB 저장
- 파일 업로드 및 전처리
- RESTful API 제공
- WebSocket 실시간 통신

#### 🤖 AI Service (FastAPI)
**주요 역할:**
- AI 기반 제품 추천 처리
- 자연어 처리 및 분석
- 벡터 검색 및 유사도 계산
- 문서/이미지 자동 분석
- OpenAI API 통합

**핵심 기능:**
- 사용자 쿼리 임베딩 생성 (OpenAI Embedding)
- Qdrant 벡터 검색 수행
- GPT 기반 추천 문장 생성
- OCR을 통한 이미지 단가표 분석
- 엑셀/CSV 파일 자동 파싱
- 텍스트 데이터 정규화
- Redis Streams 메시지 처리
- 추천 결과 점수 계산

**데이터 레이어:**
- **MySQL**: 정형 데이터 (제품, 요금제, 사용자, 채팅 이력)
- **Qdrant**: 벡터 데이터 (제품 임베딩, 검색 인덱스)
- **Redis**: 메시지 큐, 캐시, 세션 데이터

---

## 5. 기술 스택

### 🖥️ Frontend
- **Framework**: React 18+
- **State Management**: Context API / Redux Toolkit
- **Styling**: SCSS / Styled Components
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client

### 🛠️ Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: Class Validator
- **Documentation**: Swagger

### 🤖 AI Service
- **Framework**: FastAPI (Python)
- **AI/ML**: OpenAI API, Langchain
- **Vector Search**: Qdrant
- **Image Processing**: Tesseract OCR
- **Data Processing**: Pandas, NumPy

### 🗄️ Database & Infrastructure
- **RDBMS**: MySQL 8.0+
- **Vector DB**: Qdrant
- **Message Queue**: Redis Streams
- **Cache**: Redis
- **File Storage**: Local/AWS S3

### 🔧 DevOps
- **Containerization**: Docker, Docker Compose
- **Process Manager**: PM2
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston + ELK Stack

---

## 6. 개발 계획

### 📅 Phase 1: 기본 인프라 구축 (4주)
**Week 1-2: 환경 설정**
- Docker 환경 구성
- NestJS 백엔드 기본 구조
- React 프론트엔드 기본 구조
- MySQL, Redis, Qdrant 연동

**Week 3-4: 기본 기능**
- 사용자 인증 시스템
- 기본 CRUD API
- 파일 업로드 기능
- 기본 UI 컴포넌트

### 📅 Phase 2: AI 기능 개발 (6주)
**Week 5-7: AI 서비스 구축**
- FastAPI 서버 구축
- OpenAI API 연동
- 벡터 임베딩 처리
- Qdrant 벡터 검색 구현

**Week 8-10: 데이터 처리**
- OCR 엔진 구현
- 엑셀/CSV 파싱
- 데이터 정규화 로직
- 단가표 자동 분석

### 📅 Phase 3: 통합 및 최적화 (4주)
**Week 11-12: 서비스 통합**
- Redis Streams 메시지 큐 구현
- 비동기 AI 처리 흐름
- 실시간 채팅 기능
- 관리자 대시보드

**Week 13-14: 최적화 및 테스트**
- 성능 최적화
- 통합 테스트
- 사용자 테스트
- 버그 수정 및 개선

### 📅 Phase 4: 배포 및 운영 (2주)
**Week 15-16: 배포 준비**
- 프로덕션 환경 구성
- 모니터링 설정
- 보안 강화
- 문서화 완료

---

## 7. 인프라 구성

### 🐳 Docker Compose 구성
```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    
  backend:
    build: ./backend
    ports: ["3001:3001"]
    depends_on: [mysql, redis]
    
  ai-service:
    build: ./ai-service
    ports: ["8000:8000"]
    depends_on: [qdrant, redis]
    
  mysql:
    image: mysql:8.0
    ports: ["3306:3306"]
    volumes: ["mysql_data:/var/lib/mysql"]
    
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    
  qdrant:
    image: qdrant/qdrant
    ports: ["6333:6333"]
    volumes: ["qdrant_data:/qdrant/storage"]
```

### 🌐 네트워크 구성
- **External Network**: Frontend ↔ Users
- **Internal Network**: Backend ↔ AI Service
- **Data Network**: Services ↔ Databases

### 📊 모니터링 & 로깅
- **애플리케이션 모니터링**: Prometheus + Grafana
- **로그 수집**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **에러 추적**: Sentry
- **성능 모니터링**: New Relic / DataDog

---

## 8. 개발 문서

### 📁 프로젝트 구조
```
phonssa/
├── frontend/              # React 앱
│   ├── src/
│   │   ├── components/    # 재사용 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── hooks/         # 커스텀 훅
│   │   ├── services/      # API 서비스
│   │   └── utils/         # 유틸리티
│   └── package.json
│
├── backend/               # NestJS API 서버
│   ├── src/
│   │   ├── modules/       # 기능별 모듈
│   │   │   ├── auth/      # 인증 모듈
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   └── dto/
│   │   │   ├── products/  # 제품 관리 모듈
│   │   │   │   ├── products.controller.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   ├── products.module.ts
│   │   │   │   └── dto/
│   │   │   ├── chat/      # 채팅/추천 모듈
│   │   │   │   ├── chat.controller.ts
│   │   │   │   ├── chat.service.ts
│   │   │   │   ├── chat.module.ts
│   │   │   │   └── dto/
│   │   │   └── upload/    # 파일 업로드 모듈
│   │   │       ├── upload.controller.ts
│   │   │       ├── upload.service.ts
│   │   │       ├── upload.module.ts
│   │   │       └── dto/
│   │   ├── entities/      # TypeORM 엔티티
│   │   │   ├── product.entity.ts
│   │   │   ├── plan.entity.ts
│   │   │   ├── user.entity.ts
│   │   │   └── chat-session.entity.ts
│   │   ├── common/        # 공통 모듈
│   │   │   ├── guards/    # 인증/인가 가드
│   │   │   ├── interceptors/ # 인터셉터
│   │   │   ├── filters/   # 예외 필터
│   │   │   └── decorators/ # 커스텀 데코레이터
│   │   ├── config/        # 설정
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── app.config.ts
│   │   ├── main.ts        # 애플리케이션 진입점
│   │   └── app.module.ts  # 루트 모듈
│   └── package.json
│
├── ai-service/            # FastAPI AI 서버
│   ├── app/
│   │   ├── main.py            # FastAPI 애플리케이션 진입점
│   │   ├── core/              # 핵심 설정
│   │   │   ├── config.py      # 설정 관리
│   │   │   ├── security.py    # 보안/인증
│   │   │   └── database.py    # DB 연결 설정
│   │   ├── api/               # API 라우터 (Controller 역할)
│   │   │   ├── __init__.py
│   │   │   ├── deps.py        # 의존성 정의
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── recommend.py      # 추천 API
│   │   │       ├── analyze.py        # 문서 분석 API
│   │   │       └── embeddings.py     # 임베딩 API
│   │   ├── schemas/           # Pydantic 스키마 (DTO 역할)
│   │   │   ├── __init__.py
│   │   │   ├── recommend.py   # 추천 요청/응답 스키마
│   │   │   ├── analyze.py     # 분석 요청/응답 스키마
│   │   │   └── common.py      # 공통 스키마
│   │   ├── models/            # 데이터 모델 (ORM/Entity)
│   │   │   ├── __init__.py
│   │   │   ├── product.py     # 제품 모델
│   │   │   └── embedding.py   # 임베딩 모델
│   │   ├── services/          # 비즈니스 로직 (Service 역할)
│   │   │   ├── __init__.py
│   │   │   ├── recommend_service.py   # 추천 서비스
│   │   │   ├── embedding_service.py   # 임베딩 서비스
│   │   │   ├── ocr_service.py         # OCR 서비스
│   │   │   └── openai_service.py      # OpenAI API 서비스
│   │   ├── repositories/      # 데이터 접근 계층 (Repository/DAO)
│   │   │   ├── __init__.py
│   │   │   ├── vector_repository.py   # Qdrant 접근
│   │   │   ├── redis_repository.py    # Redis 접근
│   │   │   └── base_repository.py     # 기본 Repository
│   │   ├── utils/             # 유틸리티
│   │   │   ├── __init__.py
│   │   │   ├── file_utils.py
│   │   │   ├── text_processing.py
│   │   │   └── vector_utils.py
│   │   └── middleware/        # 미들웨어
│   │       ├── __init__.py
│   │       ├── cors.py
│   │       ├── logging.py
│   │       └── error_handler.py
│   └── requirements.txt
│
├── db/                    # 데이터베이스 관련
│   ├── migrations/        # 마이그레이션
│   └── seeds/             # 초기 데이터
│
├── infra/                 # 인프라 설정
│   ├── docker/            # Docker 설정
│   └── k8s/               # Kubernetes 설정
│
└── docs/                  # 문서
    ├── api/               # API 문서
    └── deployment/        # 배포 가이드
```

### 🔌 API 설계

#### Backend API (NestJS)
```typescript
// products.controller.ts - Spring Boot @RestController와 유사
@Controller('api/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: '제품 목록 조회' })
  async getProducts(@Query() query: GetProductsDto) {
    return this.productsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '제품 생성' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }
}

// products.service.ts - Spring Boot @Service와 유사
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly redisService: RedisService
  ) {}

  async findAll(query: GetProductsDto): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    
    if (query.brand) {
      queryBuilder.andWhere('product.brand = :brand', { brand: query.brand });
    }
    
    if (query.priceRange) {
      const [min, max] = query.priceRange.split('-').map(Number);
      queryBuilder.andWhere('product.price BETWEEN :min AND :max', { min, max });
    }
    
    return queryBuilder.getMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }
}

// chat.controller.ts - AI 추천 요청 처리
@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('recommend')
  async getRecommendation(@Body() chatDto: ChatRequestDto) {
    return this.chatService.processRecommendation(chatDto);
  }
}

// chat.service.ts - Redis를 통한 AI 서비스 통신
@Injectable()
export class ChatService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(ChatSession)
    private readonly chatRepository: Repository<ChatSession>
  ) {}

  async processRecommendation(chatDto: ChatRequestDto) {
    // 1. 채팅 세션 저장
    const session = await this.saveChatSession(chatDto);
    
    // 2. Redis Streams로 AI 서비스에 요청 전송
    await this.redisService.xadd('ai-requests', '*', {
      sessionId: session.id,
      message: chatDto.message,
      userId: chatDto.userId
    });
    
    // 3. 비동기 응답 대기 (WebSocket으로 클라이언트에 전달)
    return { sessionId: session.id, status: 'processing' };
  }
}
```

#### AI Service API (FastAPI)
```python
#### AI Service API (FastAPI)
```python
# main.py - FastAPI 애플리케이션 설정
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import recommend, analyze
from app.core.config import settings

app = FastAPI(title="Phonssa AI Service", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"])
app.include_router(recommend.router, prefix="/api/v1")
app.include_router(analyze.router, prefix="/api/v1")

# api/v1/recommend.py - 라우터 (Controller 역할)
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.recommend import RecommendRequest, RecommendResponse
from app.services.recommend_service import RecommendService
from app.api.deps import get_recommend_service

router = APIRouter(prefix="/recommend", tags=["recommend"])

@router.post("/", response_model=RecommendResponse)
async def create_recommendation(
    request: RecommendRequest,
    service: RecommendService = Depends(get_recommend_service)
):
    """제품 추천 API"""
    try:
        result = await service.process_recommendation(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# schemas/recommend.py - Pydantic 스키마 (DTO 역할)
from pydantic import BaseModel, Field
from typing import List, Optional

class RecommendRequest(BaseModel):
    query: str = Field(..., description="사용자 추천 요청")
    user_id: Optional[str] = Field(None, description="사용자 ID")
    context: Optional[dict] = Field(None, description="추가 컨텍스트")

class ProductRecommendation(BaseModel):
    product_id: int
    name: str
    price: float
    discount_price: Optional[float]
    similarity_score: float
    reason: str

class RecommendResponse(BaseModel):
    recommendations: List[ProductRecommendation]
    response_text: str
    processing_time: float

# services/recommend_service.py - 비즈니스 로직 (Service 역할)
from app.repositories.vector_repository import VectorRepository
from app.repositories.redis_repository import RedisRepository
from app.services.openai_service import OpenAIService
from app.services.embedding_service import EmbeddingService

class RecommendService:
    def __init__(
        self,
        vector_repo: VectorRepository,
        redis_repo: RedisRepository,
        openai_service: OpenAIService,
        embedding_service: EmbeddingService
    ):
        self.vector_repo = vector_repo
        self.redis_repo = redis_repo
        self.openai_service = openai_service
        self.embedding_service = embedding_service

    async def process_recommendation(self, request: RecommendRequest) -> RecommendResponse:
        # 1. 사용자 쿼리를 벡터로 변환
        query_embedding = await self.embedding_service.create_embedding(request.query)
        
        # 2. Qdrant에서 유사한 제품 검색
        similar_products = await self.vector_repo.search_similar_products(
            query_embedding, limit=10
        )
        
        # 3. GPT로 추천 텍스트 생성
        response_text = await self.openai_service.generate_recommendation_text(
            request.query, similar_products
        )
        
        # 4. 결과 반환
        return RecommendResponse(
            recommendations=similar_products,
            response_text=response_text,
            processing_time=0.5
        )

# repositories/vector_repository.py - 데이터 접근 계층 (Repository 역할)
from qdrant_client import QdrantClient
from qdrant_client.models import SearchRequest
from typing import List
from app.schemas.recommend import ProductRecommendation

class VectorRepository:
    def __init__(self, qdrant_client: QdrantClient):
        self.client = qdrant_client
        self.collection_name = "products"

    async def search_similar_products(
        self, 
        query_vector: List[float], 
        limit: int = 10
    ) -> List[ProductRecommendation]:
        """벡터 유사도 기반 제품 검색"""
        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=limit,
            with_payload=True
        )
        
        recommendations = []
        for result in search_result:
            recommendations.append(ProductRecommendation(
                product_id=result.payload["product_id"],
                name=result.payload["name"],
                price=result.payload["price"],
                discount_price=result.payload.get("discount_price"),
                similarity_score=result.score,
                reason=result.payload.get("description", "")
            ))
        
        return recommendations

# repositories/redis_repository.py - Redis 접근
import redis.asyncio as redis
from typing import Dict, Any

class RedisRepository:
    def __init__(self, redis_client: redis.Redis):
        self.client = redis_client

    async def process_message_queue(self, stream_name: str) -> Dict[str, Any]:
        """Redis Streams 메시지 처리"""
        messages = await self.client.xread({stream_name: '
```

### 🗃️ 데이터베이스 스키마

#### MySQL 주요 테이블
```sql
-- db/mysql/ddl/002_create_products.sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL COMMENT '제품명',
  brand VARCHAR(100) NOT NULL COMMENT '브랜드',
  model VARCHAR(100) NOT NULL COMMENT '모델명',
  category VARCHAR(50) NOT NULL COMMENT '카테고리',
  price DECIMAL(10,2) NOT NULL COMMENT '정가',
  discount_price DECIMAL(10,2) COMMENT '할인가',
  discount_rate DECIMAL(5,2) COMMENT '할인율',
  stock_quantity INT DEFAULT 0 COMMENT '재고수량',
  status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
  store_id INT COMMENT '가맹점 ID',
  specs JSON COMMENT '제품 스펙 정보',
  vector_id VARCHAR(100) COMMENT 'Qdrant 벡터 ID 참조',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_brand_category (brand, category),
  INDEX idx_price_range (price, discount_price),
  INDEX idx_status (status),
  INDEX idx_vector_id (vector_id)
) COMMENT='제품 정보 테이블';

-- db/mysql/ddl/003_create_plans.sql
CREATE TABLE plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL COMMENT '요금제명',
  carrier VARCHAR(100) NOT NULL COMMENT '통신사',
  plan_type VARCHAR(50) NOT NULL COMMENT '요금제 유형',
  monthly_fee DECIMAL(10,2) NOT NULL COMMENT '월 요금',
  data_limit VARCHAR(50) COMMENT '데이터 한도',
  voice_minutes INT COMMENT '음성통화 분',
  sms_count INT COMMENT 'SMS 개수',
  support_subsidy DECIMAL(10,2) COMMENT '지원금',
  conditions JSON COMMENT '가입 조건',
  vector_id VARCHAR(100) COMMENT 'Qdrant 벡터 ID 참조',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_carrier (carrier),
  INDEX idx_monthly_fee (monthly_fee),
  INDEX idx_vector_id (vector_id)
) COMMENT='요금제 정보 테이블';

-- db/mysql/ddl/004_create_chat_sessions.sql
CREATE TABLE chat_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_uuid VARCHAR(36) NOT NULL UNIQUE COMMENT '세션 고유 ID',
  user_id VARCHAR(100) COMMENT '사용자 ID',
  message TEXT NOT NULL COMMENT '사용자 메시지',
  response TEXT COMMENT 'AI 응답',
  intent VARCHAR(100) COMMENT '의도 분석 결과',
  extracted_conditions JSON COMMENT '추출된 조건들',
  recommended_products JSON COMMENT '추천된 제품 목록',
  similarity_scores JSON COMMENT '유사도 점수',
  processing_time DECIMAL(6,3) COMMENT '처리 시간(초)',
  status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) COMMENT='채팅 세션 테이블';

-- db/mysql/procedures/sp_product_search.sql
DELIMITER //
CREATE PROCEDURE sp_product_search(
  IN p_brand VARCHAR(100),
  IN p_min_price DECIMAL(10,2),
  IN p_max_price DECIMAL(10,2),
  IN p_category VARCHAR(50),
  IN p_limit INT
)
BEGIN
  DECLARE v_sql TEXT;
  
  SET v_sql = 'SELECT 
    p.id, p.name, p.brand, p.model, p.price, p.discount_price,
    (p.price - IFNULL(p.discount_price, p.price)) AS discount_amount,
    p.stock_quantity, p.status
  FROM products p WHERE 1=1';
  
  IF p_brand IS NOT NULL THEN
    SET v_sql = CONCAT(v_sql, ' AND p.brand = ''', p_brand, '''');
  END IF;
  
  IF p_min_price IS NOT NULL THEN
    SET v_sql = CONCAT(v_sql, ' AND IFNULL(p.discount_price, p.price) >= ', p_min_price);
  END IF;
  
  IF p_max_price IS NOT NULL THEN
    SET v_sql = CONCAT(v_sql, ' AND IFNULL(p.discount_price, p.price) <= ', p_max_price);
  END IF;
  
  IF p_category IS NOT NULL THEN
    SET v_sql = CONCAT(v_sql, ' AND p.category = ''', p_category, '''');
  END IF;
  
  SET v_sql = CONCAT(v_sql, ' AND p.status = ''active'' ORDER BY p.discount_rate DESC');
  
  IF p_limit IS NOT NULL THEN
    SET v_sql = CONCAT(v_sql, ' LIMIT ', p_limit);
  END IF;
  
  SET @sql = v_sql;
  PREPARE stmt FROM @sql;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END //
DELIMITER ;
```

#### Qdrant 벡터 DB 설정
```python
# db/qdrant/collections/products_collection.py
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, CreateCollection

class ProductsCollectionManager:
    def __init__(self, client: QdrantClient):
        self.client = client
        self.collection_name = "products"
    
    def create_collection(self):
        """제품 컬렉션 생성"""
        collection_config = CreateCollection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(
                size=1536,  # OpenAI embedding 차원
                distance=Distance.COSINE
            )
        )
        self.client.create_collection(collection_config)
    
    def create_payload_index(self):
        """페이로드 인덱스 생성 (필터링 성능 향상)"""
        # 브랜드 인덱스
        self.client.create_payload_index(
            collection_name=self.collection_name,
            field_name="brand",
            field_schema="keyword"
        )
        
        # 가격 범위 인덱스
        self.client.create_payload_index(
            collection_name=self.collection_name,
            field_name="price",
            field_schema="float"
        )
        
        # 카테고리 인덱스
        self.client.create_payload_index(
            collection_name=self.collection_name,
            field_name="category",
            field_schema="keyword"
        )

# db/qdrant/schemas/product_schema.json
{
  "collection_name": "products",
  "vector_config": {
    "size": 1536,
    "distance": "Cosine"
  },
  "payload_schema": {
    "product_id": "integer",
    "name": "text",
    "brand": "keyword",
    "category": "keyword", 
    "price": "float",
    "discount_price": "float",
    "description": "text",
    "specs": "text",
    "store_id": "integer",
    "embedding_text": "text",
    "created_at": "datetime"
  },
  "indexes": [
    {"field": "brand", "type": "keyword"},
    {"field": "category", "type": "keyword"},
    {"field": "price", "type": "float"},
    {"field": "store_id", "type": "integer"}
  ]
}

# db/qdrant/init/create_collections.py
"""Qdrant 컬렉션 초기 설정 스크립트"""
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, CreateCollection
import json
import os

def create_all_collections():
    client = QdrantClient(host="localhost", port=6333)
    
    # 제품 컬렉션
    products_collection = CreateCollection(
        collection_name="products",
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    client.create_collection(products_collection)
    
    # 요금제 컬렉션
    plans_collection = CreateCollection(
        collection_name="plans", 
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    client.create_collection(plans_collection)
    
    # 사용자 선호도 컬렉션
    preferences_collection = CreateCollection(
        collection_name="user_preferences",
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    client.create_collection(preferences_collection)
    
    print("All collections created successfully!")

# db/qdrant/queries/product_similarity.py
"""제품 유사도 검색 쿼리"""
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, Range, MatchValue
from typing import List, Dict, Any, Optional

class ProductSimilaritySearch:
    def __init__(self, client: QdrantClient):
        self.client = client
        self.collection_name = "products"
    
    def search_similar_products(
        self,
        query_vector: List[float],
        brand_filter: Optional[str] = None,
        price_range: Optional[tuple] = None,
        category_filter: Optional[str] = None,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """조건부 벡터 유사도 검색"""
        
        # 필터 조건 구성
        filters = []
        
        if brand_filter:
            filters.append(
                FieldCondition(key="brand", match=MatchValue(value=brand_filter))
            )
        
        if price_range:
            min_price, max_price = price_range
            filters.append(
                FieldCondition(
                    key="price", 
                    range=Range(gte=min_price, lte=max_price)
                )
            )
        
        if category_filter:
            filters.append(
                FieldCondition(key="category", match=MatchValue(value=category_filter))
            )
        
        # 검색 실행
        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            query_filter=Filter(must=filters) if filters else None,
            limit=limit,
            with_payload=True,
            with_vectors=False
        )
        
        return [
            {
                "id": point.id,
                "score": point.score,
                "payload": point.payload
            }
            for point in search_result
        ]
```

### 🔐 보안 고려사항
- **인증**: JWT 토큰 기반 인증
- **권한**: 역할 기반 접근 제어 (RBAC)
- **API 보안**: Rate Limiting, CORS 설정
- **데이터 보안**: 민감 정보 암호화
- **파일 업로드**: 파일 타입 검증, 크기 제한

### 🧪 테스트 전략
- **Unit Test**: Jest (Backend), Pytest (AI Service)
- **Integration Test**: Supertest, TestContainers
- **E2E Test**: Cypress, Playwright
- **Load Test**: Artillery, K6
- **Security Test**: OWASP ZAP

---

## 📝 추가 고려사항

### 🚀 성능 최적화
- Redis 캐싱 전략
- 데이터베이스 인덱싱
- CDN 활용 (정적 파일)
- 이미지 최적화

### 📈 확장성 계획
- 마이크로서비스 아키텍처 적용
- 로드 밸런싱
- 데이터베이스 샤딩
- Kafka 도입 (대용량 메시지 처리)

### 🔄 운영 계획
- CI/CD 파이프라인 구축
- 모니터링 대시보드 구성
- 장애 대응 프로세스
- 백업 및 복구 전략

---

*이 문서는 Phonssa AI 제품 추천 시스템의 전체적인 설계와 개발 계획을 담고 있습니다. 프로젝트 진행에 따라 지속적으로 업데이트될 예정입니다.*}, count=1, block=1000)
        return messages

    async def send_response(self, stream_name: str, data: Dict[str, Any]):
        """응답 메시지 전송"""
        await self.client.xadd(stream_name, data)

# api/deps.py - 의존성 주입 (Spring의 @Autowired 역할)
from fastapi import Depends
from app.services.recommend_service import RecommendService
from app.repositories.vector_repository import VectorRepository
from app.repositories.redis_repository import RedisRepository
from app.core.database import get_qdrant_client, get_redis_client

def get_vector_repository(
    qdrant_client=Depends(get_qdrant_client)
) -> VectorRepository:
    return VectorRepository(qdrant_client)

def get_redis_repository(
    redis_client=Depends(get_redis_client)
) -> RedisRepository:
    return RedisRepository(redis_client)

def get_recommend_service(
    vector_repo: VectorRepository = Depends(get_vector_repository),
    redis_repo: RedisRepository = Depends(get_redis_repository)
) -> RecommendService:
    return RecommendService(vector_repo, redis_repo)
```
```

### 🗃️ 데이터베이스 스키마

#### MySQL 주요 테이블
```sql
-- 제품 정보
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(100),
  price DECIMAL(10,2),
  discount_price DECIMAL(10,2),
  stock_quantity INT,
  status ENUM('active', 'inactive', 'out_of_stock'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 요금제 정보
CREATE TABLE plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  carrier VARCHAR(100),
  monthly_fee DECIMAL(10,2),
  data_limit VARCHAR(50),
  voice_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 채팅 이력
CREATE TABLE chat_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(100),
  message TEXT,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔐 보안 고려사항
- **인증**: JWT 토큰 기반 인증
- **권한**: 역할 기반 접근 제어 (RBAC)
- **API 보안**: Rate Limiting, CORS 설정
- **데이터 보안**: 민감 정보 암호화
- **파일 업로드**: 파일 타입 검증, 크기 제한

### 🧪 테스트 전략
- **Unit Test**: Jest (Backend), Pytest (AI Service)
- **Integration Test**: Supertest, TestContainers
- **E2E Test**: Cypress, Playwright
- **Load Test**: Artillery, K6
- **Security Test**: OWASP ZAP

---

## 📝 추가 고려사항

### 🚀 성능 최적화
- Redis 캐싱 전략
- 데이터베이스 인덱싱
- CDN 활용 (정적 파일)
- 이미지 최적화

### 📈 확장성 계획
- 마이크로서비스 아키텍처 적용
- 로드 밸런싱
- 데이터베이스 샤딩
- Kafka 도입 (대용량 메시지 처리)

### 🔄 운영 계획
- CI/CD 파이프라인 구축
- 모니터링 대시보드 구성
- 장애 대응 프로세스
- 백업 및 복구 전략

---

*이 문서는 Phonssa AI 제품 추천 시스템의 전체적인 설계와 개발 계획을 담고 있습니다. 프로젝트 진행에 따라 지속적으로 업데이트될 예정입니다.*

## 📋 문서 관리 및 개발 진행 전략

### 🗂️ 프로젝트 문서화 체계

본 프로젝트는 서버별/영역별로 세분화된 문서 관리 전략을 사용합니다:

```
md-files/
├── PROJECT.md              # 📖 프로젝트 전체 개요 및 설계 (현재 파일)
├── CLAUDE.md               # 🤖 Claude AI 작업 내역 총괄 관리
├── CLAUDE.FRONTEND.md      # 🖥️ Frontend 개발 작업 내역
├── CLAUDE.BACKEND.md       # 🛠️ Backend 개발 작업 내역 (예정)
├── CLAUDE.AI-SERVICE.md    # 🧠 AI Service 개발 작업 내역 (예정)
├── CLAUDE.DATABASE.md      # 🗄️ Database 설정 및 관리 작업 내역 (예정)
├── CLAUDE.INFRA.md         # 🚀 Infrastructure 및 DevOps 작업 내역 (예정)
└── [기타 시나리오 및 기술 문서들]
```

### 📝 문서별 관리 원칙

#### PROJECT.md (현재 파일)
- **목적**: 프로젝트 전체 아키텍처와 설계 원칙 정의
- **내용**: 시스템 개요, 기술 스택, 아키텍처, 개발 계획
- **업데이트**: 주요 아키텍처 변경이나 기술 스택 변경 시
- **관리**: 프로젝트 매니저/아키텍트 레벨

#### CLAUDE.*.md 시리즈
- **목적**: 실제 개발 작업 내역과 문제 해결 과정 기록
- **내용**: 구현 세부사항, 발생한 문제와 해결책, 테스트 결과
- **업데이트**: 해당 영역 작업 수행 시 실시간 업데이트
- **관리**: Claude AI + 개발자 협업

### 🔄 개발 진행 방식

#### Phase-based 개발
1. **Phase 1**: Frontend 구현 및 안정화 ✅
2. **Phase 2**: Backend API 서버 구현 🚧
3. **Phase 3**: AI Service 구현 🚧
4. **Phase 4**: Database 설계 및 구축 🚧
5. **Phase 5**: Infrastructure 및 배포 🚧

#### 문서 연동 원칙
- 각 Phase 시작 시 해당 CLAUDE.*.md 파일 생성
- 작업 진행 중 실시간 문제 해결 과정 기록
- Phase 완료 시 PROJECT.md에 결과 반영
- 서버 간 연동 작업 시 관련 문서들에 상호 참조

### 📈 프로젝트 현재 상태

#### ✅ 완료된 영역
- **Frontend (React)**: 초기 구현 완료, 정상 작동 확인
  - 상세 내역: [CLAUDE.FRONTEND.md](./CLAUDE.FRONTEND.md)

#### 🚧 진행 예정 영역
- **Backend (NestJS)**: API 서버 구현 예정
- **AI Service (FastAPI)**: 추천 엔진 구현 예정  
- **Database**: MySQL, Qdrant, Redis 구성 예정
- **Infrastructure**: Docker, CI/CD 구성 예정

### 🎯 다음 단계 계획

1. **Backend 개발 시작**
   - NestJS 프로젝트 초기 설정
   - 기본 API 엔드포인트 구현
   - CLAUDE.BACKEND.md 문서 생성

2. **Database 설계**
   - MySQL 스키마 설계
   - Qdrant 벡터 DB 설정
   - CLAUDE.DATABASE.md 문서 생성

3. **AI Service 구현**
   - FastAPI 기반 추천 엔진
   - OpenAI API 연동
   - CLAUDE.AI-SERVICE.md 문서 생성

*최종 업데이트: 2025-07-31 - 문서 관리 전략 수립*
