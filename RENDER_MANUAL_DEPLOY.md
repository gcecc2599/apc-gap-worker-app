# Render 배포 수동 안내

## ✅ 준비 완료

1. ✅ GitHub 저장소: https://github.com/gcecc2599/apc-gap-worker-app
2. ✅ `render.yaml` 파일 준비 완료
3. ✅ 런타임 의존성 수정 완료
4. ✅ 환경 변수 설정 완료

## 🚀 Render에서 직접 배포하기

### 단계별 안내

#### 1단계: Render 로그인
1. https://dashboard.render.com 접속
2. GitHub 버튼 클릭하여 로그인
3. GitHub 인증 완료

#### 2단계: 새 Web Service 생성
1. Render 대시보드에서 "New +" 버튼 클릭
2. "Web Service" 선택

#### 3단계: GitHub 저장소 연결
**옵션 A: Public Git repository**
- "Public Git repository" 선택
- 저장소 URL 입력: `https://github.com/gcecc2599/apc-gap-worker-app`
- "Connect" 클릭

**옵션 B: GitHub 계정 연결**
- "Connect account" 클릭
- GitHub 계정 인증
- 저장소 선택: `gcecc2599/apc-gap-worker-app`

#### 4단계: 자동 설정 확인
`render.yaml` 파일이 자동으로 감지되면:
- ✅ Name: `apc-gap-record`
- ✅ Build Command: `npm install && npm run build`
- ✅ Start Command: `npm run start:prod`
- ✅ Plan: `Free`
- ✅ Environment Variables: 자동 설정

#### 5단계: 수동 설정 (render.yaml이 감지되지 않는 경우)
다음과 같이 입력:

**Basic Settings:**
- **Name**: `apc-gap-record`
- **Region**: `Singapore` (또는 가장 가까운 지역)
- **Branch**: `main`
- **Root Directory**: `.` (비워두기)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free`

**Environment Variables:**
"Environment" 또는 "Environment Variables" 섹션에서:
- `NODE_ENV` = `production`
- `SMITHERY_API_KEY` = `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
- `PORT` = (설정하지 않음 - Render가 자동 설정)

#### 6단계: 배포 시작
1. "Create Web Service" 버튼 클릭
2. 빌드 시작 (약 5-10분 소요)
3. "Logs" 탭에서 빌드 진행 상황 확인

#### 7단계: 배포 완료 확인
1. 배포 완료 후 생성된 URL 확인
   - 예: `https://apc-gap-record.onrender.com`
2. 사이트 접속하여 정상 작동 확인
3. 로그인 기능 테스트

## 🔍 문제 해결

### 빌드 실패 시
- "Logs" 탭에서 오류 메시지 확인
- `package.json`의 dependencies 확인
- `@hono/node-server`와 `tsx`가 dependencies에 있는지 확인

### 런타임 오류 시
- "Logs" 탭에서 런타임 오류 확인
- 환경 변수가 제대로 설정되었는지 확인
- PORT 환경 변수가 자동 설정되었는지 확인

### 사이트 접속 불가 시
- 배포 상태가 "Live"인지 확인
- Health check 경로(`/`)가 정상 작동하는지 확인
- 로그에서 서버 시작 메시지 확인

## 📋 배포 정보

### GitHub 저장소
- URL: https://github.com/gcecc2599/apc-gap-worker-app
- Branch: `main`

### 빌드 명령어
```bash
npm install && npm run build
```

### 시작 명령어
```bash
npm run start:prod
```

### 환경 변수
- `NODE_ENV`: `production`
- `SMITHERY_API_KEY`: `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
- `PORT`: Render가 자동 설정 (서버는 `process.env.PORT` 사용)

## ✅ 다음 단계

배포 완료 후:
1. 생성된 URL로 사이트 접속
2. 로그인 기능 테스트
3. 농가 대시보드 테스트
4. 관리자 대시보드 테스트
5. 모든 기능 정상 작동 확인

---

**모든 준비가 완료되었습니다. Render 대시보드에서 위 단계를 따라 배포를 진행하세요!**
