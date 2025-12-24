# Antigravity AI Auction Platform - 5단계 로드맵 (AI Engine Edition)

## 목표
주식회사 희망네트워크의 기술력을 보여주는 **4060 세대 맞춤형 프리미엄 AI 경매 플랫폼**.
단순 정보 제공을 넘어, **RAG(검색 증강 생성)** 기술을 통해 서류를 이해하고 상담해주는 '경매 닥터'를 구현합니다.

---

## 단계별 계획

### 1단계: RAG 최적화 데이터베이스 설계 (완료)
- **Supabase + pgvector**: 벡터 검색 및 일반 관계형 데이터를 통합 관리.
- `document_chunks` 테이블: PDF 텍스트를 500자 단위로 임베딩하여 저장.

### 2단계: 자동 크롤링 및 미디어 파이프라인
- **Playwright + BeautifulSoup**: 옥션원 상세 정보 및 파일 링크 수집.
- **Supabase Storage**: 사진 및 PDF 자동 업로드 파이프라인.

### 3단계: AI 권리분석 및 RAG 엔진 (핵심)
- **OCR & Chunking**: PDF 내 텍스트 추출 및 의미 단위 분할.
- **Embedding**: Gemini 1.5 Pro (또는 OpenAI) 임베딩 API로 벡터 생성 및 DB 저장.
- **RAG Query**: 사용자 질문 -> 질문 벡터화 -> 가장 유사한 서류 검색 -> LLM 답변 생성.

### 4단계: 시니어 맞춤형 프리미엄 UI
- **Next.js + Tailwind CSS**: 큰 폰트, 고대비 다크 모드, 직관적 UI.
- **Map Integration**: 위도/경도 기반 지도 및 역세권 분석 코멘트 표시.

### 5단계: 실전 부가 기능
- **수익률 계산기**: 취등록세, 명도비 등을 포함한 실질 수익률 분석.
- **알림톡**: 관심 물건 변동 사항 푸시 알림.

---

## RAG 파이프라인 구조
1. **User Question**: "이 집 선순위 임차인 있어?"
2. **Vector Search**: `document_chunks`에서 '임차인', '대항력', '전입일자' 관련 텍스트 검색.
3. **Context Construction**: 검색된 텍스트 + 질문 프롬프트 구성.
4. **LLM Generation**: "서류 분석 결과, 2021.05.20 전입한 임차인 김철수가 존재하며..." 답변 생성.
