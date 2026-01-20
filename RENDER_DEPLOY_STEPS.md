# Render 배포 단계별 가이드

## ✅ 준비 완료 사항

1. ✅ `render.yaml` - Render 배포 설정 파일 준비됨
2. ✅ `package.json` - 시작 스크립트 설정됨 (`start:prod`)
3. ✅ Smithery API Key - 환경 변수로 설정됨
4. ✅ 모든 소스 코드 준비 완료

---

## 🚀 Render에서 배포하는 방법

### 방법 1: GitHub 저장소 연결 (권장)

1. **GitHub에 코드 업로드**
   - GitHub에 새 저장소 생성
   - 현재 프로젝트 폴더의 코드를 푸시

2. **Render에서 배포**
   - Render 대시보드 로그인 완료 후
   - "New" → "Web Service" 클릭
   - "Connect account" 또는 "Public Git repository" 선택
   - GitHub 저장소 선택
   - 자동으로 설정이 감지됨 (`render.yaml` 파일 기반)
   - "Create Web Service" 클릭

### 방법 2: Manual Deploy (GitHub 없이)

1. **Render 대시보드 접속**
   - https://dashboard.render.com
   - 로그인 완료

2. **Web Service 생성**
   - "New" → "Web Service" 클릭
   - "Public Git repository" 탭 선택
   - 또는 "Manual Deploy" 옵션 확인

3. **설정 입력**
   - **Name**: `apc-gap-record`
   - **Region**: `Singapore` (또는 가장 가까운 지역)
   - **Branch**: `main` (또는 `master`)
   - **Root Directory**: `.` (또는 비워두기)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: `Free` 선택

4. **환경 변수 설정**
   - "Environment" 섹션에서
   - `NODE_ENV` = `production`
   - `SMITHERY_API_KEY` = `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
   - `PORT` = (자동 설정됨)

5. **배포 시작**
   - "Create Web Service" 클릭
   - 몇 분 후 배포 완료!

---

## 📋 배포 설정 요약

### Build Command
```
npm install && npm run build
```

### Start Command
```
npm run start:prod
```

### 환경 변수
- `NODE_ENV`: `production`
- `SMITHERY_API_KEY`: `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
- `PORT`: (Render가 자동 설정)

---

## ⚡ 빠른 배포 (render.yaml 사용)

`render.yaml` 파일이 있으면 Render가 자동으로 설정을 읽습니다:

1. GitHub 저장소 연결
2. Render가 `render.yaml` 자동 감지
3. 자동 배포 시작!

---

## 🔍 배포 확인

배포 완료 후:
- Render 대시보드에서 "Logs" 탭 확인
- "Events" 탭에서 배포 상태 확인
- 생성된 URL로 사이트 접속 테스트

---

## 📝 참고

- 무료 플랜: 750시간/월
- 자동 HTTPS 제공
- 자동 재배포 (GitHub 푸시 시)
- 로그 확인 가능
