# 배포 완료 가이드

## ✅ 수정 완료 사항

1. **정적 파일 경로 수정**
   - 프로덕션 환경에서도 정상 작동하도록 `process.cwd()` 사용
   - 개발/프로덕션 환경 자동 감지

2. **Railway 설정 파일 추가**
   - `railway.json` 파일 생성
   - 빌드 및 배포 설정 자동화

3. **GitHub 푸시 완료**
   - 모든 변경사항 푸시 완료

## 🚀 배포 방법

### 방법 1: Railway (권장 - 가장 쉬움)

1. **Railway 접속**
   - https://railway.app/new 접속
   - GitHub 계정으로 로그인

2. **GitHub Repository 연결**
   - "GitHub Repository" 선택
   - 저장소 선택: `gcecc2599/apc-gap-worker-app`
   - 또는 저장소 URL 입력: `https://github.com/gcecc2599/apc-gap-worker-app`

3. **자동 배포**
   - Railway가 자동으로 설정 감지
   - 빌드 시작 (약 3-5분 소요)

4. **환경 변수 설정**
   - 프로젝트 설정 → Variables
   - 다음 환경 변수 추가:
     - `NODE_ENV` = `production`
     - `SMITHERY_API_KEY` = `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`
     - `PORT` = (자동 설정, 수동 설정 불필요)

5. **배포 완료 확인**
   - 배포 완료 후 생성된 URL 확인
   - 사이트 접속 테스트

### 방법 2: Render (대안)

1. **Render 접속**
   - https://dashboard.render.com 접속
   - GitHub 계정으로 로그인

2. **Web Service 생성**
   - "New +" → "Web Service" 클릭
   - 저장소 연결: `https://github.com/gcecc2599/apc-gap-worker-app`

3. **설정 확인**
   - `render.yaml` 파일이 자동 감지됨
   - 환경 변수 자동 설정

4. **배포 시작**
   - "Create Web Service" 클릭

## 📋 현재 설정

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
- `PORT`: 자동 설정 (서버는 `process.env.PORT` 사용)

## 🔍 문제 해결

### 빌드 실패 시
- 로그 확인: 빌드 로그에서 오류 메시지 확인
- 의존성 확인: `package.json`의 dependencies 확인
- Node 버전: Node.js 18 이상 필요

### 런타임 오류 시
- 로그 확인: 런타임 로그에서 오류 확인
- 환경 변수: 모든 환경 변수가 설정되었는지 확인
- 포트: PORT 환경 변수가 자동 설정되었는지 확인

### 정적 파일 오류 시
- 정적 파일 경로: `process.cwd()` 사용으로 수정됨
- 파일 존재 확인: `public/` 폴더의 파일 확인

## ✅ 배포 확인 체크리스트

- [ ] 배포 완료 (서비스 상태: Live)
- [ ] 생성된 URL 접속 가능
- [ ] 랜딩 페이지 정상 표시
- [ ] 로그인 기능 테스트
- [ ] 농가 대시보드 접근 가능
- [ ] 관리자 대시보드 접근 가능
- [ ] API 엔드포인트 정상 작동
- [ ] 정적 파일 (아이콘, manifest) 정상 로드

## 📞 다음 단계

배포 완료 후:
1. 생성된 URL로 사이트 접속
2. 모든 기능 정상 작동 확인
3. 로그인 테스트
4. 기록 입력/조회 테스트
5. 다운로드 기능 테스트

---

**모든 준비가 완료되었습니다! Railway나 Render에서 배포를 진행하세요.**
