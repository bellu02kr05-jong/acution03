-- Antigravity Premium AI Auction DB Schema V2 (AI Engine Edition)
-- Designed for PostgreSQL / Supabase with Vector Search

-- 0. RAG 기능을 위한 Vector 확장 활성화 (필수)
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. 경매 물건 테이블 (강화된 버전)
CREATE TABLE IF NOT EXISTS auction_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 기본 정보
    case_number VARCHAR(100) NOT NULL UNIQUE, -- 사건번호
    court_name VARCHAR(100) NOT NULL,          -- 관할법원
    item_type VARCHAR(50),                     -- 물건종류
    address TEXT NOT NULL,                     -- 소재지
    
    -- 부동산 상세 제원 (5060 사용자를 위한 정밀 필터링)
    land_area DECIMAL(12,2),       -- 토지면적 (sqm)
    building_area DECIMAL(12,2),   -- 건물면적 (sqm)
    usage_status TEXT,             -- 이용상태 (예: 주거용, 상업용)
    
    -- 가격 정보
    appraisal_price BIGINT,                    -- 감정가
    minimum_price BIGINT,                      -- 최저매각가격
    current_percent INT,                       -- 현재가율 (정보 유지용)
    
    -- 위치 정보 (지도 API 연동용)
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- 일정 및 상태
    auction_date TIMESTAMP WITH TIME ZONE,     -- 입찰기일
    status VARCHAR(20) DEFAULT '진행중',        -- 경매 상태
    
    -- 미디어 및 AI
    image_urls TEXT[] DEFAULT '{}',
    pdf_urls TEXT[] DEFAULT '{}',
    ai_analysis_json JSONB DEFAULT '{}', -- AI 등급, 요약, 리스크 요인
    
    -- 지표
    view_count INT DEFAULT 0,
    interest_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RAG 전용: 문서 임베딩 테이블 (AI 지식베이스)
-- AI가 사용자의 질문에 답변할 때 서류의 내용을 검색하는 곳
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES auction_items(id) ON DELETE CASCADE,
    content TEXT,                   -- 추출된 텍스트 조각 (Chunk)
    metadata JSONB,                 -- 메타데이터 (페이지, 서류출처)
    embedding vector(1536)          -- Gemini 1.5 Pro / OpenAI 임베딩 (1536차원)
);

-- 3. 인덱스 최적화
CREATE INDEX IF NOT EXISTS idx_case_number ON auction_items(case_number);
CREATE INDEX IF NOT EXISTS idx_ai_score ON auction_items((ai_analysis_json->>'score'));
CREATE INDEX IF NOT EXISTS idx_location ON auction_items(latitude, longitude);
-- Vector 검색 인덱스 (HNSW - 속도 최적화, ivfflat - 정확도/메모리 균형)
-- 데이터가 쌓인 후 생성하는 것이 좋으나 예시로 포함
-- CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
