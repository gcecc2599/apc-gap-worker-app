# 빠른 배포 가이드

## 방법 1: Render (가장 쉬움 - 웹 브라우저로)

1. https://render.com 접속 및 로그인
2. "New" → "Web Service" 클릭
3. "Public Git repository" 선택
   - GitHub 저장소 URL 입력 (코드를 먼저 GitHub에 올려야 함)
   - 또는 "Manual Deploy" 선택하여 ZIP 파일 업로드
4. 설정:
   - **Name**: `apc-gap-record`
   - **Region**: `Singapore` (가장 가까운 지역)
   - **Branch**: `main` (또는 `master`)
   - **Root Directory**: `.` (또는 비워두기)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: `Free`
5. "Create Web Service" 클릭

✅ 몇 분 후 배포 완료!

---

## 방법 2: Railway (웹 브라우저로)

1. https://railway.app 접속 및 로그인
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
   - GitHub 저장소 연결
   - 또는 "Empty Project" → "Settings" → "Source" → "Connect GitHub repo"
4. 자동으로 배포 시작

✅ 자동 배포!

---

## 방법 3: Fly.io (CLI)

```bash
# 1. 로그인
flyctl auth login

# 2. 앱 생성 및 배포
cd C:\Users\user\Desktop\webapp
flyctl launch

# 3. 배포
flyctl deploy
```

---

## 방법 4: Railway CLI

1. 브라우저에서 Railway 로그인
2. https://railway.app/new 로 접속
3. "Deploy from GitHub repo" 선택
4. 저장소 선택 후 자동 배포

---

## 현재 프로젝트 상태

✅ 모든 파일 준비 완료
✅ `render.yaml` - Render 배포 설정
✅ `Procfile` - Heroku/Railway용
✅ `Dockerfile` - Docker 배포용
✅ `fly.toml` - Fly.io 배포 설정
✅ `package.json` - 시작 스크립트 포함

---

## 추천 순서

1. **Render** - 가장 쉽고 빠름 (웹 인터페이스)
2. **Railway** - GitHub 연동 자동 배포
3. **Fly.io** - CLI로 빠른 배포

**GitHub 없이 배포하려면**: Render에서 "Manual Deploy" 또는 ZIP 파일 업로드 사용
