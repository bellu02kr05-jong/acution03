# Task Checklist: Antigravity AI RAG Engine

- [/] **Phase 1: Database & Storage**
    - [x] Create PostgreSQL Schema V2 (Vector Optimized)
    - [ ] Initialize Supabase Project (Enable `pgvector`)
    - [ ] Create Storage Buckets (`auction-files`)

- [/] **Phase 2: Data Pipeline (Python)**
    - [x] Setup Environment (`playwright`, `bs4`, `supabase`)
    - [x] Crawler: Fetch Details & Files (Playwright/BS4)
    - [ ] Storage: Upload Files to Supabase Storage
    - [ ] Database: Insert Items metadata

- [ ] **Phase 3: RAG Engine (Smart Brain)**
    - [x] Processor: PDF Text Extraction & Chunking Logic (Drafted)
    - [ ] Embedder: Create Vector Embeddings (Gemini/OpenAI) 
    - [ ] Store: Save Embeddings to `document_chunks`
    - [ ] Query Logic: Implement Semantic Search Function

- [ ] **Phase 4: Frontend Implementation**
    - [ ] Design: Senior-Friendly Dark UI
    - [ ] Feature: Map Integration (Lat/Lon)
    - [ ] Feature: Chat Doctor Connected to RAG API

- [ ] **Phase 5: Deployment & Operations**
    - [ ] User Testing (Mock 5060 Group)
    - [ ] Yield Calculator & Notifications
