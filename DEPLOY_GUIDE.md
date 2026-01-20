# 무료 배포 가이드 - 빠른 시작

## 🚀 가장 쉬운 방법: Render (권장)

### 1단계: Render 계정 생성
1. https://render.com 접속
2. "Get Started for Free" 클릭
3. GitHub 계정으로 로그인 (권장) 또는 이메일로 가입

### 2단계: 프로젝트 배포
1. Render 대시보드에서 "New" → "Web Service" 클릭
2. GitHub 저장소 연결 (또는 "Public Git repository"에 직접 URL 입력)
   - 저장소가 없다면: GitHub에 코드 업로드 후 연결
3. 설정 입력:
   - **Name**: `apc-gap-record` (원하는 이름)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run dev`
   - **Plan**: `Free` 선택
4. "Create Web Service" 클릭

✅ **완료!** 몇 분 후 배포 URL이 생성됩니다.

---

## 🎯 Railway (대안 1)

1. https://railway.app 접속
2. "Start a New Project" → "Deploy from GitHub repo"
3. 저장소 선택 후 자동 배포

**무료**: $5 크레딧/월

---

## ⚡ Fly.io (대안 2)

```bash
# 1. Fly CLI 설치
npm install -g flyctl

# 2. 로그인
flyctl auth login

# 3. 프로젝트 초기화
cd C:\Users\user\Desktop\webapp
flyctl launch

# 4. 배포
flyctl deploy
```

**무료**: 3개의 공유 CPU VM

---

## 📦 현재 프로젝트 구조

- ✅ `render.yaml` - Render 배포 설정 (이미 준비됨)
- ✅ `package.json` - Node.js 스크립트 포함
- ✅ `src/server.ts` - Node.js 서버 코드
- ✅ Hono 앱 완전 구성됨

---

## 🔧 수동 배포 (Render)

GitHub 없이 수동 배포:

1. Render 대시보드 → "New" → "Web Service"
2. "Public Git repository" 선택
3. 저장소 URL 입력 (GitHub에 코드를 먼저 올려야 함)
4. 설정:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run dev`
   - Plan: `Free`
5. "Create Web Service"

---

## 💡 추천

**Render**를 가장 추천합니다:
- ✅ 설정이 매우 쉬움
- ✅ 무료 플랜 제공
- ✅ 자동 HTTPS
- ✅ GitHub 연동으로 자동 배포
- ✅ 로그 확인 가능

**가장 빠른 방법**: GitHub에 코드를 올린 후 Render에서 자동 배포!
