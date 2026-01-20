# Smithery API 키 사용 가이드

## 📌 Smithery API 키란?

Smithery는 **MCP (Model Context Protocol) 서버** 배포 플랫폼입니다. 
현재 프로젝트는 **Hono 기반 웹 애플리케이션**이므로 Smithery로 직접 배포할 수 없습니다.

하지만 API 키는 다른 용도로 활용할 수 있습니다.

---

## 🔧 API 키 사용 방법

### 방법 1: 환경 변수로 설정 (Render, Railway 등)

배포 플랫폼에서 환경 변수로 API 키를 설정할 수 있습니다:

#### Render에서 설정:
1. Render 대시보드 → 프로젝트 선택
2. "Environment" 탭 클릭
3. "Add Environment Variable" 클릭
4. Key: `SMITHERY_API_KEY`, Value: `your_api_key`
5. "Save Changes" 클릭

#### Railway에서 설정:
1. Railway 대시보드 → 프로젝트 선택
2. "Variables" 탭 클릭
3. "New Variable" 클릭
4. Key: `SMITHERY_API_KEY`, Value: `your_api_key`
5. "Add" 클릭

### 방법 2: 로컬 개발 시 사용

```bash
# Windows PowerShell
$env:SMITHERY_API_KEY="your_api_key_here"
npm run dev

# Windows CMD
set SMITHERY_API_KEY=your_api_key_here
npm run dev
```

### 방법 3: .env 파일 사용 (로컬 개발)

`.env` 파일 생성 (Git에 커밋하지 말 것):

```env
SMITHERY_API_KEY=your_api_key_here
NODE_ENV=development
PORT=8787
```

---

## ⚠️ 주의사항

1. **보안**: API 키를 코드에 직접 작성하지 마세요
2. **Git**: `.env` 파일은 `.gitignore`에 포함되어 있습니다
3. **용도**: Smithery API 키는 주로 MCP 서버 배포에 사용됩니다
4. **현재 프로젝트**: 이 프로젝트는 웹 앱이므로 Smithery CLI로 배포할 수 없습니다

---

## 🚀 추천 배포 방법

현재 프로젝트를 배포하려면:

1. **Render** (가장 쉬움) - https://render.com
2. **Railway** - https://railway.app
3. **Fly.io** - https://fly.io
4. **Cloudflare Pages** - https://pages.cloudflare.com

이 플랫폼들은 Smithery API 키를 환경 변수로 저장하여 필요시 사용할 수 있습니다.

---

## 📝 참고

- Smithery는 MCP 서버 전용 플랫폼입니다
- 웹 애플리케이션 배포에는 Render, Railway, Fly.io 등을 사용하세요
- API 키는 환경 변수로 안전하게 관리하세요
