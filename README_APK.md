# 📱 APK 파일 생성 가이드

## 사전 요구사항

### 1. Android Studio 설치
- [Android Studio 다운로드](https://developer.android.com/studio)
- Android SDK 설치
- JDK 17 이상 설치

### 2. 환경 변수 설정
```bash
# JAVA_HOME 설정
JAVA_HOME=C:\Program Files\Java\jdk-17

# ANDROID_HOME 설정  
ANDROID_HOME=C:\Users\사용자명\AppData\Local\Android\Sdk

# PATH에 추가
%JAVA_HOME%\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
```

## APK 생성 방법

### 방법 1: Capacitor 사용 (추천)

```bash
# 1. 프로젝트 빌드
npm run build

# 2. Capacitor 동기화
npx cap sync android

# 3. Android Studio에서 빌드
npx cap open android
# Android Studio가 열리면: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### 방법 2: 명령줄로 직접 빌드

```bash
# Android 프로젝트로 이동
cd android

# Debug APK 빌드
.\gradlew assembleDebug

# Release APK 빌드 (서명 필요)
.\gradlew assembleRelease
```

## APK 파일 위치

빌드 완료 후 APK 파일 위치:
- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## 문제 해결

### Java 버전 문제
```bash
# Java 버전 확인
java -version
# JDK 17 이상 필요
```

### Gradle 빌드 실패
```bash
# Gradle 래퍼 권한 문제 (Linux/Mac)
chmod +x android/gradlew

# Windows에서는 .bat 사용
android\gradlew.bat assembleDebug
```

### Android SDK 경로 오류
- Android Studio > SDK Manager에서 Android SDK 경로 확인
- `capacitor.config.ts`에서 경로 확인

## 간단한 APK 생성 (WebView 기반)

현재 프로젝트는 서버사이드 렌더링(Hono)을 사용하므로, 
APK로 만들려면 정적 HTML 버전이 필요합니다.

**옵션 1**: 정적 HTML 생성 후 Capacitor로 패키징
**옵션 2**: WebView에서 원격 서버 URL 로드 (인터넷 연결 필요)

## 참고

- Capacitor 공식 문서: https://capacitorjs.com/docs
- Android 개발 가이드: https://developer.android.com/guide
