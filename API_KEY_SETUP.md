# Smithery API 키 설정 완료

## ✅ 설정된 API 키

```
de50bb25-4fb0-4e5d-8648-ec1ce0656b56
```

## 📝 설정 완료 사항

1. ✅ `render.yaml` - Render 배포 시 환경 변수로 자동 설정
2. ✅ 환경 변수 확인 코드 추가 (`src/server.ts`)
3. ✅ `package.json` - 스크립트 추가

## 🚀 사용 방법

### Render에서 배포 시:

API 키가 자동으로 환경 변수로 설정됩니다. 추가 설정 불필요합니다.

### 로컬 개발 시:

```powershell
# Windows PowerShell
$env:SMITHERY_API_KEY="de50bb25-4fb0-4e5d-8648-ec1ce0656b56"
npm run dev
```

```cmd
# Windows CMD
set SMITHERY_API_KEY=de50bb25-4fb0-4e5d-8648-ec1ce0656b56
npm run dev
```

### 다른 플랫폼 (Railway, Fly.io 등):

배포 플랫폼의 환경 변수 설정에서:
- **Key**: `SMITHERY_API_KEY`
- **Value**: `de50bb25-4fb0-4e5d-8648-ec1ce0656b56`

## ⚠️ 주의사항

- API 키는 민감한 정보이므로 Git에 커밋하지 마세요
- `.env` 파일을 사용한다면 `.gitignore`에 포함되어 있습니다
- 배포 플랫폼에서는 환경 변수로 안전하게 관리됩니다

## 🔍 확인

서버 실행 시 콘솔에 "✅ Smithery API Key 설정됨" 메시지가 표시됩니다.
