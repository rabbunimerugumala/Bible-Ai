# 📖 Bible AI — Production-Grade Intelligent Scripture Companion

<div align="center">

![Bible AI Banner](assets/images/hero-bible.png)

**An AI-powered mobile application for deep Bible study, semantic scripture search, intelligent Q&A, and biblical-style text generation.**

[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?style=flat-square&logo=react)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-52.0-000020?style=flat-square&logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Architecture](#-architecture)
5. [Folder Structure](#-folder-structure)
6. [Setup Instructions](#-setup-instructions)
7. [Docker Setup](#-docker-setup)
8. [Testing](#-testing)
9. [Deployment — AWS EC2 + NGINX](#-deployment--aws-ec2--nginx)
10. [Security Practices](#-security-practices)
11. [Observability & Monitoring](#-observability--monitoring)
12. [Scaling Notes](#-scaling-notes)
13. [Production-Grade Standards](#-production-grade-standards)
14. [CI/CD Pipeline](#-cicd-pipeline)
15. [Contributing](#-contributing)

---

## 🌟 Overview

**Bible AI** is a premium, production-grade mobile application built with React Native and Expo that transforms the way users interact with the Holy Scriptures. By combining modern AI/NLP techniques with a beautifully crafted glassmorphism UI, Bible AI provides:

- **Intelligent Verse Discovery** — Keyword and semantic (vector-embedding) search across the entire KJV corpus
- **Conversational Scripture Q&A** — Natural language questions answered with contextual verse references
- **AI Text Generation** — Create original biblical-style prose in Psalm, Prophecy, Proverb, or Gospel styles
- **Thematic Exploration** — Browse 15 curated themes and 12 books with instant verse retrieval
- **Daily Devotional** — Algorithmically selected verse of the day with parchment-styled presentation

The app is architecturally designed for a future real-backend integration (FastAPI + PyTorch + FAISS + PostgreSQL) while delivering a fully functional experience today via intelligent mocked AI services.

---

## ✨ Features

### 🔍 Search Engine
| Feature | Description | AI Method |
|---------|-------------|-----------|
| **Keyword Search** | Exact token matching across all verse text | SQL `LIKE` / JS `includes()` |
| **Semantic Search** | Meaning-based retrieval — finds verses by concept | SentenceTransformer embeddings + FAISS (mocked: TF-IDF scoring) |
| **Multi-filter** | Filter by book, testament, theme | Compound query builder |
| **Suggested Queries** | Curated starter searches for onboarding | Static + algorithmic |

### 🤖 AI Q&A (Ask AI Tab)
| Feature | Description |
|---------|-------------|
| **Natural Language Q&A** | Ask questions in plain English; receive scripture-grounded answers |
| **Verse Context Cards** | Each answer surfaces 1–2 relevant verse references |
| **Quick Question Chips** | One-tap suggested questions for discovery |
| **Chat History** | Persistent in-session conversation thread |
| **Typing Indicators** | Streaming-style UX with animated indicator |

> **AI Backend**: Intent matched via keyword pattern recognition (12 theological topics). Production upgrade: fine-tuned BERT QA model on Bible QA dataset.

### ✍️ Text Generation (Creative Mode)
| Style | Description | Linguistic Model |
|-------|-------------|-----------------|
| **Psalm** | Poetic praise — parallelism, imagery | GPT-2 fine-tuned on Psalms corpus |
| **Prophecy** | Prophetic declarations — "Thus saith the Lord" | Seq2Seq with prophetic book corpus |
| **Proverb** | Aphoristic wisdom sayings | Fine-tuned on Proverbs + Ecclesiastes |
| **Gospel** | Narrative good news — parable style | GPT-2 fine-tuned on Synoptic Gospels |

### 🏷️ Verse Classification (Explore Tab)
| Feature | Description |
|---------|-------------|
| **Theme Classification** | 15 theological categories (Love, Faith, Hope, Wisdom, etc.) |
| **Book Navigation** | Old & New Testament books with chapter counts and category labels |
| **Testament Grouping** | Visual separation of Old and New Testament |
| **Featured Collections** | Curated theme collections with verse counts |

> **Production Model**: Logistic Regression / fine-tuned DistilBERT classifier trained on verse-theme pairs.

### 📊 Analytics & Insights *(Phase 2)*
- Popular query tracking
- Trending verse dashboard
- User reading streak
- Theme distribution charts

### 🌐 Multi-Translation Support *(Phase 3)*
- King James Version (KJV) — **current**
- American Standard Version (ASV) — planned
- Darby Translation — planned
- Side-by-side comparison view — planned

---

## 🛠 Tech Stack

### Mobile Application (Current)
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React Native | 0.76.x | Cross-platform mobile UI |
| **Build Tool** | Expo SDK | 52.x | Managed workflow, OTA updates |
| **Language** | TypeScript | 5.3.x | Type safety, developer experience |
| **Navigation** | Expo Router | 4.x | File-based routing (Next.js-style) |
| **Animations** | Expo Linear Gradient | 14.x | GPU-accelerated gradients |
| **Images** | expo-image | 2.x | Optimized image rendering |
| **Icons** | @expo/vector-icons | 14.x | Feather, MaterialIcons, FontAwesome5 |
| **Safe Areas** | react-native-safe-area-context | 4.x | Notch/island handling |
| **State** | React hooks (useState, useContext) | — | Local + shared state management |

### AI/ML Backend (Production Architecture)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **API Server** | FastAPI (Python 3.11) | Async REST API, OpenAPI docs |
| **NLP Models** | Hugging Face Transformers | BERT QA, GPT-2 generation, DistilBERT classification |
| **Embeddings** | SentenceTransformers | all-MiniLM-L6-v2 for semantic similarity |
| **Vector DB** | FAISS | In-memory semantic search (ANN retrieval) |
| **Relational DB** | PostgreSQL 16 | Verse text, user data, analytics |
| **Cache** | Redis 7 | Response caching, rate limiting, sessions |
| **ML Framework** | PyTorch 2.x | Model inference and fine-tuning |
| **Data Processing** | Pandas, NumPy | CSV ingestion, preprocessing |

### Infrastructure (Production)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Containerization** | Docker + Docker Compose | Reproducible environments |
| **Reverse Proxy** | NGINX | SSL termination, load balancing |
| **Cloud** | AWS EC2 (t3.medium+) | Application hosting |
| **Storage** | AWS S3 | Model artifacts, user uploads |
| **CDN** | AWS CloudFront | Static asset delivery |
| **Secrets** | AWS Secrets Manager | API keys, DB credentials |
| **CI/CD** | GitHub Actions | Automated testing and deployment |
| **Monitoring** | Prometheus + Grafana | Metrics, alerting |
| **Logging** | AWS CloudWatch | Centralized log aggregation |

---

## 🏛 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT (React Native/Expo)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  Home    │  │ Search   │  │  Chat    │  │  Creative    │   │
│  │  Screen  │  │  Screen  │  │  Screen  │  │  Screen      │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │              │                │           │
│  ┌────▼──────────────▼──────────────▼────────────────▼──────┐  │
│  │               Hooks Layer (Business Logic)                 │  │
│  │     useSearch  │  useChat  │  useCreative  │  useBible    │  │
│  └────┬──────────────────────────────────────────────────────┘  │
│       │                                                          │
│  ┌────▼──────────────────────────────────────────────────────┐  │
│  │               Services Layer (Data Access)                 │  │
│  │       bibleService.ts  │  aiService.ts                    │  │
│  └────┬──────────────────────────────────────────────────────┘  │
└───────┼─────────────────────────────────────────────────────────┘
        │ HTTPS / REST API
┌───────▼─────────────────────────────────────────────────────────┐
│                      NGINX (Reverse Proxy)                       │
│               SSL Termination + Load Balancing                   │
└───────┬─────────────────────────────────────────────────────────┘
        │
┌───────▼─────────────────────────────────────────────────────────┐
│                   FastAPI Application Server                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  /ask    │  │ /search  │  │/generate │  │  /classify   │   │
│  │  Q&A     │  │ Semantic │  │  GPT-2   │  │  DistilBERT  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │              │                │           │
│  ┌────▼──────────────▼──────────────▼────────────────▼──────┐  │
│  │              AI/ML Service Layer                           │  │
│  │  BERT QA Model │ SentenceTransformer │ GPT-2 │ Classifier │  │
│  └────┬──────────────────┬───────────────────────────────────┘  │
│       │                   │                                       │
│  ┌────▼──────┐       ┌────▼──────┐  ┌────────────┐              │
│  │PostgreSQL │       │  FAISS    │  │   Redis    │              │
│  │ (Verses)  │       │  Vector   │  │  (Cache)   │              │
│  └───────────┘       └───────────┘  └────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow — Semantic Search
```
User Query → Tokenize → SentenceTransformer Encode → 384-dim Vector
→ FAISS ANN Search (top-K) → Verse IDs → PostgreSQL Fetch → Ranked Results
```

### Data Flow — Q&A
```
Question → Intent Classification → BERT QA (extractive) → Evidence Passages
→ Verse Retrieval → Response Assembly → Client Response
```

---

## 📁 Folder Structure

```
bible-ai/
│
├── app/                          # Expo Router — screen entrypoints
│   ├── _layout.tsx               # Root layout: AlertProvider + SafeAreaProvider
│   └── (tabs)/                   # Tab group
│       ├── _layout.tsx           # Tab navigator (5 tabs, gold theme)
│       ├── index.tsx             # 🏠 Home — hero, daily verse, browse
│       ├── search.tsx            # 🔍 Search — keyword + semantic AI mode
│       ├── chat.tsx              # 🤖 Ask AI — conversational Q&A chat
│       ├── creative.tsx          # ✍️  Creative — AI text generation
│       └── explore.tsx           # 🧭 Explore — themes + books browser
│
├── components/
│   └── ui/
│       ├── VerseCard.tsx         # Verse display (default/parchment/compact variants)
│       ├── SearchBar.tsx         # Glassmorphic search input with clear action
│       └── ThemeTag.tsx          # Pill tag for theme filtering (selected state)
│
├── constants/
│   ├── theme.ts                  # Design system: Colors, Spacing, Typography, Shadows
│   └── bibleData.ts             # Static verse corpus (30 KJV verses), book metadata
│
├── hooks/
│   ├── useSearch.ts             # Search state: query, results, mode, loading
│   ├── useChat.ts               # Chat state: messages, send, clear, loading
│   └── useCreative.ts           # Creative state: prompt, style, result, history
│
├── services/
│   ├── bibleService.ts          # Verse querying: search, filter by theme/book/testament
│   └── aiService.ts             # AI layer: Q&A patterns, text templates, semantic mock
│
├── assets/
│   └── images/
│       ├── hero-bible.png        # AI-generated hero banner (16:9, navy/gold)
│       └── chat-bg.png           # AI-generated chat background illustration
│
├── template/                     # OnSpace Cloud auth/UI template system
│   ├── auth/                     # Authentication providers (mock + Supabase)
│   ├── core/                     # Client config, types
│   └── ui/                       # Alert system (AlertProvider, useAlert)
│
├── app.json                      # Expo app configuration
├── babel.config.js               # Babel transpiler config
├── tsconfig.json                 # TypeScript compiler options
├── package.json                  # Dependencies and scripts
├── eslint.config.js              # ESLint rules
└── README.md                     # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

| Requirement | Version | Install |
|-------------|---------|---------|
| Node.js | 18.x LTS | [nodejs.org](https://nodejs.org) |
| npm / yarn | 9.x / 1.22.x | Bundled with Node |
| Expo CLI | Latest | `npm i -g expo-cli` |
| iOS Simulator | Xcode 15+ | macOS only |
| Android Emulator | Android Studio | All platforms |

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-org/bible-ai.git
cd bible-ai

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start

# 4. Choose your target platform
#    Press 'i' for iOS Simulator
#    Press 'a' for Android Emulator
#    Press 'w' for Web preview
#    Scan QR code with Expo Go app for physical device
```

### Running the Application

**Start development server (interactive menu):**
```bash
npm start
```

**Run on specific platform:**
```bash
npm run web      # Run in web browser at http://localhost:8081
npm run ios      # Run on iOS Simulator (macOS only)
npm run android  # Run on Android Emulator
```

**Alternative Expo commands:**
```bash
npx expo start              # Start with interactive menu
npx expo start --web        # Direct web mode
npx expo start --ios        # Direct iOS mode
npx expo start --android    # Direct Android mode
```

**Access the web version:**
- Open browser to `http://localhost:8081`
- Or press `w` in the terminal when `npm start` is running

**Mobile device via Expo Go (Recommended):**

1. Install Expo Go on your mobile device:
   - **Android:** [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS:** [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Start the dev server:
   ```bash
   npm start
   ```

3. In the terminal, press `s` to show the QR code

4. Open Expo Go app and:
   - Tap the **QR code icon** (top right)
   - Scan the code from your terminal
   - App will load on your device (20-30 seconds on first load)

**Requirements for Expo Go:**
- ✅ Phone and computer on same WiFi network
- ✅ Dev server running (port 8081)
- ✅ Expo Go app installed

**Tunnel Mode** (if on different networks):
- Press `j` in terminal to enable tunnel mode
- Scan the new QR code
- (Slower but works across networks)

### Environment Variables

Create a `.env` file in the project root:

```bash
# API Configuration (for production backend)
EXPO_PUBLIC_API_BASE_URL=https://api.bible-ai.example.com
EXPO_PUBLIC_API_VERSION=v1

# OnSpace Cloud (if using OnSpace backend)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Analytics (optional)
EXPO_PUBLIC_ANALYTICS_KEY=your_analytics_key

# Feature Flags
EXPO_PUBLIC_ENABLE_SEMANTIC_SEARCH=true
EXPO_PUBLIC_ENABLE_CREATIVE_MODE=true
```

> ⚠️ **Never commit `.env` to version control.** Add it to `.gitignore`.

---

## 🐳 Docker Setup

### Application Dockerfile (Production Backend)

```dockerfile
# Dockerfile.api
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Pre-download AI models during build
RUN python -c "from sentence_transformers import SentenceTransformer; \
    SentenceTransformer('all-MiniLM-L6-v2')"

# Create non-root user
RUN useradd -m -u 1001 appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

### Docker Compose (Full Stack)

```yaml
# docker-compose.yml
version: '3.9'

services:
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile.api
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/bibleai
      - REDIS_URL=redis://redis:6379
      - SECRET_KEY=${SECRET_KEY}
      - ENVIRONMENT=production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    volumes:
      - model_cache:/app/models
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: bibleai
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD} --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      - api
    restart: unless-stopped

  prometheus:
    image: prom/prometheus:v2.48.0
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    restart: unless-stopped

  grafana:
    image: grafana/grafana:10.2.0
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  model_cache:
  prometheus_data:
  grafana_data:
  nginx_logs:
```

### Run Docker Stack

```bash
# Copy environment template
cp .env.example .env
# Edit .env with your secrets

# Build and start all services
docker-compose up -d --build

# Verify all services are healthy
docker-compose ps

# View API logs
docker-compose logs -f api

# Stop services
docker-compose down
```

---

## 🧪 Testing

### Unit Tests (Services + Hooks)

```bash
# Install test dependencies
npm install --save-dev jest @testing-library/react-native

# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Watch mode (development)
npm test -- --watch
```

**Example test — bibleService:**
```typescript
// __tests__/services/bibleService.test.ts
import { searchVerses, getVersesByTheme } from '@/services/bibleService';

describe('bibleService', () => {
  test('searchVerses returns results for "love"', () => {
    const results = searchVerses('love');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].text.toLowerCase()).toContain('love');
  });

  test('getVersesByTheme returns verses for "Faith"', () => {
    const verses = getVersesByTheme('Faith');
    expect(verses.length).toBeGreaterThan(0);
    verses.forEach(v => expect(v.themes).toContain('Faith'));
  });
});
```

### Integration Tests

```bash
# Backend API integration tests (pytest)
cd backend
pip install pytest pytest-asyncio httpx
pytest tests/ -v --asyncio-mode=auto
```

### End-to-End Tests (Detox)

```bash
# Install Detox CLI
npm install -g detox-cli

# Run E2E tests on iOS
detox test --configuration ios.sim.release

# Run E2E tests on Android
detox test --configuration android.emu.release
```

### Performance Testing

```bash
# Load test the API with k6
k6 run tests/load/search-test.js

# Example k6 script
# Simulates 100 concurrent users for 60 seconds
```

---

## ☁️ Deployment — AWS EC2 + NGINX

### Step 1 — Provision EC2 Instance

```bash
# Recommended: t3.medium (2 vCPU, 4 GB RAM) for MVP
# Production: t3.large or c5.xlarge for ML inference

# Instance setup via AWS CLI
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \  # Ubuntu 22.04 LTS
  --instance-type t3.medium \
  --key-name bible-ai-key \
  --security-group-ids sg-xxxxxxxx \
  --subnet-id subnet-xxxxxxxx \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=bible-ai-prod}]'
```

### Step 2 — Server Setup

```bash
# SSH into EC2
ssh -i bible-ai-key.pem ubuntu@<EC2_PUBLIC_IP>

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | bash
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone https://github.com/your-org/bible-ai.git /opt/bible-ai
cd /opt/bible-ai
```

### Step 3 — NGINX Configuration

```nginx
# /nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream api_servers {
        server api:8000;
        keepalive 32;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=30r/m;
    limit_req_zone $binary_remote_addr zone=search_limit:10m rate=10r/s;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip compression
    gzip on;
    gzip_types application/json text/plain;
    gzip_min_length 1000;

    server {
        listen 80;
        server_name api.bible-ai.example.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name api.bible-ai.example.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

        # API proxy
        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;
            proxy_pass http://api_servers/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 120s;
            proxy_connect_timeout 10s;
        }

        # Search endpoint — higher rate limit
        location /api/search {
            limit_req zone=search_limit burst=50 nodelay;
            proxy_pass http://api_servers/search;
        }

        # Health check (no rate limit)
        location /health {
            proxy_pass http://api_servers/health;
        }
    }
}
```

### Step 4 — SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot -y

# Obtain certificate
sudo certbot certonly --standalone \
  -d api.bible-ai.example.com \
  --email admin@bible-ai.example.com \
  --agree-tos --non-interactive

# Auto-renewal cron
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

### Step 5 — Deploy

```bash
cd /opt/bible-ai

# Set production environment
cp .env.example .env
nano .env  # Fill in all secrets

# Start production stack
docker-compose -f docker-compose.yml up -d --build

# Verify deployment
curl -f https://api.bible-ai.example.com/health
```

### Mobile App — OTA Update (Expo)

```bash
# Publish OTA update (no app store submission needed)
npx expo publish --release-channel production

# Build production binary
eas build --platform all --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 🔒 Security Practices

### Input Validation

```python
# backend/schemas.py — Pydantic validation
from pydantic import BaseModel, Field, validator
import re

class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)
    mode: str = Field(default="keyword", regex="^(keyword|semantic)$")
    limit: int = Field(default=10, ge=1, le=50)

    @validator('query')
    def sanitize_query(cls, v):
        # Remove SQL injection attempts
        v = re.sub(r"[;'\"\-\-]", "", v)
        # Remove excessive whitespace
        return " ".join(v.split())

class AskRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=500)

    @validator('question')
    def validate_question(cls, v):
        if any(word in v.lower() for word in ['<script', 'javascript:', 'eval(']):
            raise ValueError("Invalid input detected")
        return v.strip()
```

### Authentication & Authorization

```python
# JWT-based API authentication
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Secrets Management

```bash
# Use AWS Secrets Manager for production secrets
aws secretsmanager create-secret \
  --name bible-ai/production \
  --secret-string '{
    "DB_PASSWORD": "...",
    "REDIS_PASSWORD": "...",
    "SECRET_KEY": "...",
    "JWT_SECRET": "..."
  }'

# Fetch secrets in application startup
import boto3
import json

def get_secrets():
    client = boto3.client('secretsmanager', region_name='us-east-1')
    response = client.get_secret_value(SecretId='bible-ai/production')
    return json.loads(response['SecretString'])
```

### Security Checklist

- ✅ All API inputs validated with Pydantic schemas
- ✅ SQL queries use parameterized statements (SQLAlchemy ORM)
- ✅ Rate limiting per IP and per endpoint
- ✅ CORS restricted to allowed origins
- ✅ JWT tokens with short expiry (15 min access, 7 day refresh)
- ✅ HTTPS-only with HSTS headers
- ✅ Secrets in AWS Secrets Manager (never in code/env files in prod)
- ✅ Docker containers run as non-root user
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ Dependency vulnerability scanning (npm audit, pip-audit)
- ✅ GitHub Dependabot enabled for automatic PR updates

---

## 📊 Observability & Monitoring

### Logging Architecture

```python
# backend/logger.py — Structured logging
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "service": "bible-ai-api",
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "extra": getattr(record, 'extra', {}),
        })

# Usage
logger = logging.getLogger(__name__)

@app.get("/search")
async def search(request: SearchRequest):
    logger.info("Search request", extra={
        "query": request.query,
        "mode": request.mode,
        "user_id": current_user.id
    })
    # ... handler logic
    logger.info("Search completed", extra={
        "results_count": len(results),
        "latency_ms": elapsed_ms
    })
```

### Prometheus Metrics

```python
# backend/metrics.py
from prometheus_client import Counter, Histogram, Gauge

REQUEST_COUNT = Counter(
    'bible_ai_requests_total',
    'Total API requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'bible_ai_request_duration_seconds',
    'Request latency',
    ['endpoint'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0]
)

AI_INFERENCE_TIME = Histogram(
    'bible_ai_inference_seconds',
    'AI model inference time',
    ['model_type']
)

ACTIVE_USERS = Gauge(
    'bible_ai_active_sessions',
    'Current active sessions'
)
```

### Grafana Dashboard Panels

| Panel | Metric | Alert Threshold |
|-------|--------|----------------|
| Request Rate | `rate(requests_total[5m])` | > 1000 req/min |
| Error Rate | `rate(requests_total{status=~"5.."}[5m])` | > 1% |
| P95 Latency | `histogram_quantile(0.95, ...)` | > 3s |
| AI Inference P50 | `histogram_quantile(0.5, inference_seconds)` | > 2s |
| DB Connection Pool | `pg_pool_active / pg_pool_size` | > 90% |
| Redis Hit Rate | `redis_hits / (redis_hits + redis_misses)` | < 80% |

### Health Check Endpoint

```python
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.APP_VERSION,
        "checks": {
            "database": await check_db(),
            "redis": await check_redis(),
            "faiss_index": check_faiss_loaded(),
        }
    }
```

---

## ⚡ Scaling Notes

### Horizontal Scaling

```yaml
# ECS Task Definition for auto-scaling
{
  "family": "bible-ai-api",
  "containerDefinitions": [{
    "name": "api",
    "image": "bible-ai:latest",
    "memory": 2048,
    "cpu": 1024,
    "portMappings": [{"containerPort": 8000}]
  }],
  "requiresCompatibilities": ["FARGATE"]
}

# Auto-scaling policy
Target: 70% CPU utilization
Min tasks: 2, Max tasks: 20
Scale-out cooldown: 60s
Scale-in cooldown: 300s
```

### Redis Caching Strategy

```python
# Cache verse search results — 1 hour TTL
@cached(cache=RedisCache(ttl=3600), key_builder=request_key_builder)
async def search_verses(query: str, mode: str) -> List[Verse]:
    if mode == "semantic":
        return await semantic_search(query)
    return keyword_search(query)

# Cache AI Q&A responses — 24 hour TTL
@cached(cache=RedisCache(ttl=86400))
async def get_qa_response(question_hash: str) -> AIResponse:
    return await run_bert_inference(question_hash)

# Cache daily verse — refresh at midnight UTC
@cached(cache=RedisCache(ttl=86400), key="daily_verse")
async def get_daily_verse() -> Verse:
    return select_verse_for_today()
```

### FAISS Vector Index

```python
# backend/faiss_service.py
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

class FAISSService:
    def __init__(self):
        # Load model once at startup
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.index = None
        self.verse_ids = []

    def build_index(self, verses: List[Verse]):
        """Build FAISS index from verse embeddings."""
        texts = [v.text for v in verses]
        embeddings = self.model.encode(texts, batch_size=64, show_progress_bar=True)

        # Normalize for cosine similarity
        faiss.normalize_L2(embeddings)

        # Build IVFFlat index for scalability
        dimension = embeddings.shape[1]  # 384 for MiniLM
        quantizer = faiss.IndexFlatIP(dimension)
        self.index = faiss.IndexIVFFlat(quantizer, dimension, 100)
        self.index.train(embeddings)
        self.index.add(embeddings)
        self.verse_ids = [v.id for v in verses]

    def search(self, query: str, k: int = 10) -> List[str]:
        """Return top-K verse IDs for a query."""
        query_vector = self.model.encode([query])
        faiss.normalize_L2(query_vector)
        distances, indices = self.index.search(query_vector, k)
        return [self.verse_ids[i] for i in indices[0] if i != -1]
```

### Database Optimization

```sql
-- PostgreSQL indexes for performance
CREATE INDEX CONCURRENTLY idx_verses_book ON verses(book);
CREATE INDEX CONCURRENTLY idx_verses_testament ON verses(testament);
CREATE INDEX CONCURRENTLY idx_verses_text_fts ON verses USING gin(to_tsvector('english', text));

-- Full-text search query
SELECT * FROM verses
WHERE to_tsvector('english', text) @@ plainto_tsquery('english', $1)
ORDER BY ts_rank(to_tsvector('english', text), plainto_tsquery('english', $1)) DESC
LIMIT 20;
```

---

## 🏆 Production-Grade Standards

### Reliability

| Practice | Implementation |
|----------|---------------|
| **Error Boundaries** | React Error Boundaries on all tab screens |
| **Retry Logic** | Exponential backoff on API calls (3 retries, 1s/2s/4s) |
| **Graceful Degradation** | Falls back to keyword search if semantic fails |
| **Offline Mode** | Cached verses available without network |
| **Health Checks** | Docker healthcheck + NGINX upstream monitoring |
| **Circuit Breaker** | Disable AI features if inference endpoint is down |

### Code Quality

| Standard | Tool | Config |
|----------|------|--------|
| **Type Safety** | TypeScript strict mode | `strict: true` in tsconfig |
| **Linting** | ESLint | eslint.config.js |
| **Formatting** | Prettier | `.prettierrc` |
| **Docstrings** | JSDoc (TS) / Google style (Python) | All public functions |
| **Naming** | camelCase (JS), snake_case (Python) | Enforced by linter |
| **Module Size** | Max 300 lines per file | ESLint rule |

### Maintainability

```
Data → Services → Hooks → Components → Screens
  ↑         ↑         ↑          ↑          ↑
 Pure     Pure    State+Logic  UI only   Compose
functions functions management rendering everything
```

Every layer has a single responsibility. No component calls an API directly. No service imports React.

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Bible AI CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test -- --coverage --watchAll=false

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Build and push Docker image
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker build -t bible-ai:${{ github.sha }} ./backend
          docker push $ECR_REGISTRY/bible-ai:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to EC2
        run: |
          ssh -i ${{ secrets.EC2_KEY }} ubuntu@${{ secrets.EC2_HOST }} \
            "cd /opt/bible-ai && \
             git pull origin main && \
             IMAGE_TAG=${{ github.sha }} docker-compose up -d --build api && \
             docker-compose exec -T api python -m pytest tests/ -q"

  expo-publish:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npx expo publish --release-channel production
```

---

## 👥 Contributing

```bash
# Fork and clone
git clone https://github.com/your-username/bible-ai.git

# Create feature branch
git checkout -b feature/add-verse-bookmarks

# Make changes following the architecture guide above

# Run tests
npm test

# Commit with conventional commits
git commit -m "feat(bookmarks): add AsyncStorage persistence for saved verses"

# Push and open PR
git push origin feature/add-verse-bookmarks
```

### Commit Convention

| Prefix | Use |
|--------|-----|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `perf:` | Performance improvement |
| `refactor:` | Code restructure (no behavior change) |
| `docs:` | Documentation only |
| `test:` | Test additions or fixes |
| `chore:` | Build, deps, config |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ☩ and modern AI**

*"Thy word is a lamp unto my feet, and a light unto my path." — Psalms 119:105*

</div>
