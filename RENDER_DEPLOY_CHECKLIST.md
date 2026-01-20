# Render 배포 체크리스트

## ✅ 준비 완료

1. ✅ GitHub 저장소: https://github.com/gcecc2599/apc-gap-worker-app
2. ✅ `render.yaml` 파일 준비 완료
3. ✅ 런타임 의존성 수정 완료:
   - `@hono/node-server` → dependencies로 이동
   - `tsx` → dependencies로 이동
4. ✅ 환경 변수 설정 완료:
   - `NODE_ENV`: production
   - `SMITHERY_API_KEY`: de50bb25-4fb0-4e5d-8648-ec1ce0656b56
5. ✅ PORT: Render가 자동 설정 (서버는 `process.env.PORT` 사용)

## 🚀 Render 배포 절차

### 1. Render 대시보드 접속
- https://dashboard.render.com 접속
- GitHub 계정으로 로그인 (이미 완료)

### 2. 새 Web Service 생성
- "New" → "Web Service" 클릭
- 또는 "New +" 버튼 클릭 → "Web Service" 선택

### 3. GitHub 저장소 연결
**방법 A: Public Git repository**
- "Public Git repository" 선택
- 저장소 URL 입력: `https://github.com/gcecc2599/apc-gap-worker-app`
- "Connect" 클릭

**방법 B: GitHub 계정 연결**
- "Connect account" 클릭
- GitHub 계정 인증
- 저장소 선택: `gcecc2599/apc-gap-worker-app`

### 4. 자동 설정 확인
`render.yaml` 파일이 자동으로 감지되면 다음 설정이 자동 적용됩니다:
- **Name**: `apc-gap-record`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free`
- **Environment Variables**: 자동 설정됨

### 5. 수동 설정 (render.yaml이 감지되지 않는 경우)
- **Name**: `apc-gap-record`
- **Region**: `Singapore` (또는 가장 가까운 지역)
- **Branch**: `main`
- **Root Directory**: `.` (비워두기)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free`
- **Environment Variables**:
  - `NODE_ENV` = `production`
  - `SMITHERY_API_KEY` = `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
  - `PORT` = (Render가 자동 설정 - 설정 불필요)

### 6. 배포 시작
- "Create Web Service" 클릭
- 빌드 및 배포 시작 (약 5-10분 소요)

### 7. 배포 확인
- 배포 완료 후 생성된 URL 확인 (예: `https://apc-gap-record.onrender.com`)
- 사이트 접속하여 정상 작동 확인
- "Logs" 탭에서 로그 확인

## 📋 현재 빌드 설정

### Build Command
```bash
npm install && npm run build
```

이 명령어는:
1. 모든 의존성 설치 (dependencies + devDependencies)
2. TypeScript 컴파일 (`tsc`)
3. Vite 빌드 (`vite build`)
4. Netlify 리다이렉트 파일 복사 (Render에서는 불필요하지만 오류 없음)

### Start Command
```bash
npm run start:prod
```

이 명령어는:
1. `tsx src/server.ts` 실행
2. Hono 앱을 Node.js 서버로 실행
3. PORT 환경 변수 사용 (Render가 자동 설정)

## ⚠️ 주의사항

1. **PORT 환경 변수**: Render가 자동으로 설정하므로 명시적으로 설정할 필요 없음
2. **빌드 시간**: 첫 배포는 5-10분 정도 소요될 수 있음
3. **무료 플랜 제한**: 
   - 15분 미사용 시 자동 스핀다운
   - 재시작 시 약 30초 대기 시간
   - 월 750시간 무료 사용량

## 🔍 문제 해결

### 빌드 실패 시
- "Logs" 탭에서 오류 메시지 확인
- GitHub 저장소의 코드가 최신인지 확인
- `npm install` 로컬에서 실행하여 의존성 문제 확인

### 런타임 오류 시
- "Logs" 탭에서 런타임 오류 확인
- 환경 변수가 제대로 설정되었는지 확인
- 서버 로그에서 포트 및 시작 메시지 확인

### 사이트 접속 불가 시
- 배포 상태가 "Live"인지 확인
- Health check 경로(`/`)가 정상 작동하는지 확인
- 로그에서 서버 시작 메시지 확인

## 📞 다음 단계

배포 완료 후:
1. 생성된 URL 확인 및 접속 테스트
2. 로그인 기능 테스트
3. 농가 대시보드 테스트
4. 관리자 대시보드 테스트
5. 모든 기능 정상 작동 확인
