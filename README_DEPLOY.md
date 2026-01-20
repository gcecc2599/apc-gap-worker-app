# 무료 배포 가이드

이 프로젝트를 무료로 배포하는 방법입니다.

## 1. Render (권장 - 가장 쉬움)

1. https://render.com 에서 계정 생성 (GitHub로 로그인 가능)
2. "New" → "Web Service" 클릭
3. GitHub 저장소 연결 또는 직접 업로드
4. 설정:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run dev` 또는 Node.js 서버 실행
   - **Environment**: `Node`
5. "Create Web Service" 클릭

**무료 플랜**: 750시간/월 무료

## 2. Railway (권장)

1. https://railway.app 에서 계정 생성
2. "New Project" → "Deploy from GitHub repo"
3. 저장소 선택 후 자동 배포

**무료 플랜**: $5 크레딧/월 무료

## 3. Fly.io

1. https://fly.io 에서 계정 생성
2. Fly CLI 설치: `npm install -g flyctl`
3. 로그인: `flyctl auth login`
4. 배포: `flyctl launch`

**무료 플랜**: 3개의 공유 CPU 256MB VM 무료

## 4. Vercel (Hono Edge Functions 사용)

1. https://vercel.com 에서 계정 생성
2. GitHub 저장소 연결
3. 빌드 설정 자동 감지

**무료 플랜**: 무제한 대역폭

## 5. Cloudflare Pages (Cloudflare Workers)

1. https://pages.cloudflare.com 에서 계정 생성
2. Cloudflare API 토큰 생성
3. `wrangler pages deploy dist --project-name=apc-gap-record`

**무료 플랜**: 무제한 요청

---

**가장 쉬운 방법**: Render를 권장합니다. GitHub에 코드를 올린 후 Render에서 배포하면 됩니다.
