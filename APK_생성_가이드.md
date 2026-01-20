# 📱 APK 파일 생성 가이드

## ⚠️ 중요 사항

현재 프로젝트는 **서버사이드 렌더링(Hono)**을 사용하므로, APK로 만들기 위해서는 추가 작업이 필요합니다.

## 🎯 APK 생성 방법 (3가지 옵션)

### 방법 1: 간단한 WebView APK (추천 ⭐)

**필요사항**: Android Studio 설치

1. **Android Studio 설치**
   - [다운로드](https://developer.android.com/studio)
   - Android SDK 자동 설치됨

2. **간단한 WebView 앱 생성**
   - Android Studio > New Project > Empty Activity
   - WebView를 사용하는 간단한 앱 생성
   - 서버 URL을 하드코딩하여 로드

3. **APK 빌드**
   - Build > Build Bundle(s) / APK(s) > Build APK(s)
   - `app/build/outputs/apk/debug/app-debug.apk` 생성

### 방법 2: Capacitor 사용 (고급)

**필요사항**: Node.js 22+ 및 Android Studio

1. **Node.js 업그레이드** (현재 v20 → v22 필요)
   - [Node.js 다운로드](https://nodejs.org/)

2. **Capacitor 설정**
   ```bash
   npm run build
   npx cap add android
   npx cap sync android
   npx cap open android
   ```

3. **Android Studio에서 빌드**

### 방법 3: 온라인 APK 빌더 사용

웹사이트를 APK로 변환하는 온라인 서비스:
- **WebViewGold**: https://www.webviewgold.com/
- **Andromo**: https://www.andromo.com/
- **Appsgeyser**: https://www.appsgeyser.com/

**장점**: 코드 작성 불필요, 빠른 생성
**단점**: 유료 서비스 가능성, 커스터마이징 제한

## 📋 현재 상황

- ✅ Capacitor 설치 완료
- ✅ capacitor.config.ts 생성 완료
- ❌ Node.js 버전 부족 (v20 → v22 필요)
- ❌ Android 프로젝트 미생성 (Node.js 업그레이드 후 가능)

## 🚀 빠른 해결 방법

### 옵션 A: WebView APK 템플릿 사용

제공된 간단한 Android 프로젝트 템플릿을 사용하여 수동으로 APK 생성:

1. Android Studio 설치
2. WebView 기반 프로젝트 생성
3. 서버 URL 설정
4. APK 빌드

### 옵션 B: PWA 사용 (가장 쉬움 ⭐)

이미 PWA로 설정되어 있으므로:
- 모바일 브라우저에서 접속
- "홈 화면에 추가"로 설치
- **별도 APK 파일 불필요**

**장점**: 설치 파일 불필요, 즉시 사용 가능
**단점**: 브라우저 필요

## 💡 추천 방법

**PWA 설치**가 가장 간단하고 빠릅니다. APK가 반드시 필요한 경우에만 Android Studio를 사용하여 WebView 기반 앱을 만드는 것을 권장합니다.

## 📞 다음 단계

원하는 방법을 선택해 주세요:
1. **PWA 설치** (이미 준비됨) - 가장 쉬움
2. **WebView APK 템플릿** 제공
3. **Node.js 업그레이드** 후 Capacitor 사용
