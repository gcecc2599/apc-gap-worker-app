# 배포 가이드

이 프로젝트는 Netlify와 Cloudflare Pages 모두에서 배포할 수 있습니다.

## Netlify 배포

### 1. 사전 준비

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# Netlify 로그인
netlify login
```

### 2. 프로젝트 초기화

```bash
cd webapp
netlify init
```

### 3. 배포 설정

프롬프트에 따라 다음을 입력:
- **Create & configure a new site**: 새 사이트 생성
- **Team**: 개인 또는 팀 선택
- **Site name**: 사이트 이름 입력 (또는 Enter로 자동 생성)
- **Build command**: `npm run build`
- **Directory to deploy**: `dist`

### 4. 배포

```bash
# 프리뷰 배포
npm run deploy:preview

# 프로덕션 배포
npm run deploy
```

### 5. 커스텀 도메인 연결

1. Netlify 대시보드 → Site settings → Domain management
2. "Add custom domain" 클릭
3. 도메인 입력 (예: `example.com`)
4. DNS 설정:
   - **Netlify DNS 사용**: 네임서버를 Netlify로 변경
   - **외부 DNS 사용**: 
     - A 레코드: `75.2.60.5`
     - CNAME: `www` → `your-site.netlify.app`

### 6. 환경 변수 설정

1. Netlify 대시보드 → Site settings → Environment variables
2. 환경 변수 추가:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM_NUMBER`
   - `JWT_SECRET`

## Cloudflare Pages 배포

### 1. 사전 준비

```bash
# Wrangler CLI 설치
npm install -g wrangler

# Cloudflare 로그인
wrangler login
```

### 2. D1 데이터베이스 생성

```bash
wrangler d1 create webapp-production
```

### 3. wrangler.toml 업데이트

생성된 `database_id`를 `wrangler.toml`에 추가:

```toml
[[d1_databases]]
binding = "DB"
database_name = "webapp-production"
database_id = "your-database-id"
```

### 4. 마이그레이션 실행

```bash
# 로컬 마이그레이션
npm run db:migrate:local

# 프로덕션 마이그레이션
wrangler d1 migrations apply webapp-production
```

### 5. 배포

```bash
npm run deploy:cloudflare
```

## Git 기반 자동 배포

### Netlify

1. GitHub/GitLab 저장소 생성
2. Netlify 대시보드 → Add new site → Import an existing project
3. Git 저장소 선택
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. "Deploy site" 클릭

이후 `main` 브랜치에 푸시할 때마다 자동 배포됩니다.

### Cloudflare Pages

1. GitHub/GitLab 저장소 생성
2. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git
3. Git 저장소 선택
4. 빌드 설정:
   - Framework preset: `Hono`
   - Build command: `npm run build`
   - Build output directory: `dist`

## 배포 확인

배포 후 다음을 확인하세요:

1. **랜딩 페이지**: `https://your-site.netlify.app/` (Netlify) 또는 `https://your-site.pages.dev/` (Cloudflare)
2. **API 엔드포인트**: `https://your-site.netlify.app/api/auth/login`
3. **농가 대시보드**: `https://your-site.netlify.app/farmer`
4. **반응형 디자인**: 모바일, 태블릿, 데스크톱에서 테스트

## 문제 해결

### 빌드 실패

- `package.json`의 스크립트 확인
- Node.js 버전 확인 (v18 이상)
- 빌드 로그 확인

### API 엔드포인트 404

- `_redirects` 파일 확인 (Netlify)
- Functions 디렉토리 구조 확인
- 배포 로그 확인

### 환경 변수 불러오기 실패

- 배포 플랫폼 대시보드에서 환경 변수 확인
- 변수명 대소문자 확인
- 재배포 필요할 수 있음

## 참고 자료

- [Netlify 문서](https://docs.netlify.com/)
- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Hono 문서](https://hono.dev/)
