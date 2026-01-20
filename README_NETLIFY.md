# Netlify 배포 가이드

## 📋 개요

이 프로젝트는 Netlify를 통해 배포할 수 있도록 구성되어 있습니다. Netlify는 서버리스 함수, 정적 파일 호스팅, 자동 HTTPS, 커스텀 도메인 연결을 제공합니다.

## 🚀 빠른 시작

### 1. Netlify CLI 설치

```bash
npm install -g netlify-cli
```

### 2. Netlify 로그인

```bash
netlify login
```

### 3. 프로젝트 연결

```bash
netlify init
```

### 4. 로컬 개발 서버 실행

```bash
npm run dev
# 또는
netlify dev
```

### 5. 배포

#### 프리뷰 배포
```bash
npm run deploy:preview
# 또는
netlify deploy
```

#### 프로덕션 배포
```bash
npm run deploy
# 또는
netlify deploy --prod
```

## 📁 프로젝트 구조

```
webapp/
├── netlify.toml           # Netlify 배포 설정
├── _redirects             # 리다이렉션 규칙
├── .env.example           # 환경 변수 예시
├── netlify/
│   └── functions/
│       └── api.ts         # Netlify Functions API 엔드포인트
├── src/
│   ├── index.tsx          # Hono 메인 앱
│   ├── api.tsx            # API 엔드포인트
│   ├── farmer.tsx         # 농가 대시보드
│   └── sms.ts             # SMS 알림
└── public/
    └── static/            # 정적 파일
```

## ⚙️ 설정 파일 설명

### netlify.toml

Netlify 배포 설정을 담고 있는 파일입니다.

- **빌드 명령**: `npm run build`
- **출력 디렉토리**: `dist`
- **Functions 디렉토리**: `netlify/functions`
- **리다이렉션**: API 요청을 Netlify Functions로 라우팅

### _redirects

Netlify 리다이렉션 규칙 파일입니다.

- `/api/*` → Netlify Functions로 리다이렉트
- `/*` → SPA 라우팅을 위한 index.html fallback

## 🌐 커스텀 도메인 설정

### 1. Netlify 대시보드에서 도메인 추가

1. Netlify 대시보드 → 사이트 선택 → Domain settings
2. "Add custom domain" 클릭
3. 도메인 입력 (예: `example.com`)

### 2. DNS 설정

#### Netlify DNS 사용 (권장)
- Netlify가 제공하는 네임서버로 변경
- DNS 레코드 자동 설정

#### 외부 DNS 사용
- A 레코드: `75.2.60.5`
- CNAME 레코드: `www` → `your-site.netlify.app`

### 3. SSL 인증서

Netlify가 자동으로 Let's Encrypt 인증서를 발급하고 갱신합니다.

## 🔐 환경 변수 설정

### Netlify 대시보드에서 설정

1. Site settings → Environment variables
2. 환경 변수 추가:
   - `TWILIO_ACCOUNT_SID` (SMS 기능용)
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM_NUMBER`
   - `JWT_SECRET` (인증용)

### .env 파일 (로컬 개발)

`.env.example`을 복사하여 `.env` 파일을 생성하고 실제 값으로 채워주세요.

```bash
cp .env.example .env
```

## 📊 Netlify Functions

API 엔드포인트는 Netlify Functions로 배포됩니다.

- **함수 파일**: `netlify/functions/api.ts`
- **엔드포인트**: `/.netlify/functions/api/*`
- **리다이렉션**: `/api/*` → `/.netlify/functions/api/*`

## 🔄 Git 기반 자동 배포

### GitHub 연동

1. Netlify 대시보드 → Site settings → Build & deploy
2. "Link to Git provider" 클릭
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 배포 브랜치

- **프로덕션**: `main` 또는 `master` 브랜치
- **프리뷰**: Pull Request마다 자동 생성
- **브랜치 배포**: 다른 브랜치도 설정 가능

## 📱 반응형 디자인

프로젝트는 모바일, 태블릿, 데스크톱을 지원하는 반응형 디자인을 적용했습니다.

- **모바일**: < 640px
- **태블릿**: 640px - 1024px
- **데스크톱**: > 1024px

## 🛠️ 문제 해결

### 빌드 실패

- `package.json`의 빌드 스크립트 확인
- Node.js 버전 확인 (v18 이상 권장)
- `netlify.toml`의 설정 확인

### API 엔드포인트 404

- `_redirects` 파일 확인
- `netlify/functions/api.ts` 파일 확인
- Netlify Functions 로그 확인

### 환경 변수 불러오기 실패

- Netlify 대시보드의 Environment variables 확인
- 로컬 개발 시 `.env` 파일 확인
- 변수명 대소문자 확인

## 📚 참고 자료

- [Netlify 공식 문서](https://docs.netlify.com/)
- [Netlify Functions 가이드](https://docs.netlify.com/functions/overview/)
- [Netlify 도메인 설정](https://docs.netlify.com/domains-https/custom-domains/)
- [Hono + Netlify](https://hono.dev/getting-started/netlify)

## 📞 지원

문제가 발생하면 Netlify 대시보드의 로그를 확인하거나, [Netlify 지원 포럼](https://answers.netlify.com/)을 참고하세요.
