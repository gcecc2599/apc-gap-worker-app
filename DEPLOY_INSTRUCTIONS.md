# Render 배포 지침

## ✅ 준비 완료

1. ✅ GitHub 저장소: https://github.com/gcecc2599/apc-gap-worker-app
2. ✅ `render.yaml` 파일 준비 완료
3. ✅ 모든 코드 푸시 완료
4. ✅ Smithery API Key 설정 완료

## 🚀 Render에서 배포하기

### 방법 1: 웹 인터페이스에서 배포 (권장)

1. **Render 로그인**
   - https://dashboard.render.com 접속
   - GitHub 계정으로 로그인

2. **Web Service 생성**
   - 로그인 후 "New" → "Web Service" 클릭
   - "Public Git repository" 선택

3. **GitHub 저장소 연결**
   - 저장소 URL 입력: `https://github.com/gcecc2599/apc-gap-worker-app`
   - 또는 "Connect account"로 GitHub 계정 연결 후 저장소 선택

4. **자동 설정 확인**
   - `render.yaml` 파일이 자동으로 감지됨
   - 설정이 자동으로 적용됨:
     - Name: `apc-gap-record`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start:prod`
     - Plan: `Free`
     - 환경 변수: 자동 설정됨

5. **배포 시작**
   - "Create Web Service" 클릭
   - 몇 분 후 배포 완료!

---

### 방법 2: Manual 설정

만약 `render.yaml`이 감지되지 않으면:

1. **설정 입력**
   - **Name**: `apc-gap-record`
   - **Region**: `Singapore` (또는 가장 가까운 지역)
   - **Branch**: `main`
   - **Root Directory**: `.` (비워두기)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: `Free`

2. **환경 변수 추가**
   - `NODE_ENV` = `production`
   - `SMITHERY_API_KEY` = `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
   - `PORT` = (Render가 자동 설정)

3. **배포**
   - "Create Web Service" 클릭

---

## 📋 현재 설정

### Build Command
```
npm install && npm run build
```

### Start Command
```
npm run start:prod
```

### 환경 변수 (render.yaml에 포함됨)
- `NODE_ENV`: `production`
- `SMITHERY_API_KEY`: `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
- `PORT`: Render가 자동 설정

---

## ✅ 배포 확인

배포 완료 후:
- Render 대시보드에서 배포 상태 확인
- 생성된 URL로 사이트 접속 테스트
- "Logs" 탭에서 로그 확인

---

**GitHub 저장소가 준비되었습니다! Render에서 로그인 후 배포를 시작하세요.**
