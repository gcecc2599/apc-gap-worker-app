# PWA (Progressive Web App) 설치 가이드

## 📱 모바일 앱으로 설치하기

이 웹 애플리케이션은 PWA로 구성되어 있어 스마트폰에 앱처럼 설치할 수 있습니다.

### 설치 방법

#### Android (Chrome/Edge)
1. Chrome 또는 Edge 브라우저에서 웹사이트 접속
2. 주소창의 메뉴 (⋮) 클릭
3. "홈 화면에 추가" 또는 "앱 설치" 선택
4. 설치 확인

#### iOS (Safari)
1. Safari 브라우저에서 웹사이트 접속
2. 공유 버튼 (□↑) 클릭
3. "홈 화면에 추가" 선택
4. 앱 이름 확인 후 "추가" 클릭

### 주요 기능

- ✅ 오프라인 지원 (Service Worker)
- ✅ 앱 아이콘 및 스플래시 화면
- ✅ 전체화면 모드
- ✅ 푸시 알림 지원 (향후)
- ✅ 빠른 로딩 속도 (캐싱)

### 파일 구조

```
public/
  ├── manifest.json      # PWA 매니페스트 파일
  ├── sw.js             # Service Worker (오프라인 지원)
  ├── icon-192.png      # 192x192 앱 아이콘
  └── icon-512.png      # 512x512 앱 아이콘
```

### 아이콘 생성 방법

아이콘 파일이 없는 경우:

1. 온라인 아이콘 생성 도구 사용
   - https://www.favicon-generator.org/
   - https://realfavicongenerator.net/

2. 또는 create-icons.html 파일을 브라우저에서 열어 자동 생성

### 빌드 및 배포

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

### PWA 테스트

1. Chrome DevTools > Application > Manifest에서 매니페스트 확인
2. Service Worker 탭에서 SW 등록 상태 확인
3. Lighthouse에서 PWA 점수 확인

### 문제 해결

- 아이콘이 표시되지 않음: public 폴더에 icon-192.png, icon-512.png 확인
- Service Worker 등록 실패: HTTPS 또는 localhost에서만 작동
- 앱 설치 옵션이 안 보임: manifest.json과 Service Worker가 정상 작동하는지 확인
