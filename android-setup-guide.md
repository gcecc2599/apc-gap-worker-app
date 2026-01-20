# 📱 Android APK 생성 완전 가이드

## 1단계: Android Studio 설치

### 다운로드 및 설치
1. https://developer.android.com/studio 접속
2. "Download Android Studio" 클릭
3. 설치 프로그램 실행
4. 설치 옵션에서 다음 포함 확인:
   - ✅ Android SDK
   - ✅ Android SDK Platform
   - ✅ Android Virtual Device (선택사항)

### 설치 시간
- 약 2-5분 (인터넷 속도에 따라 다름)

## 2단계: Android Studio 설정

### 첫 실행 시
1. SDK 설치 확인
2. 라이선스 동의
3. 설정 완료 대기

## 3단계: Android 프로젝트 생성

### 방법 A: Android Studio GUI 사용 (추천)

1. **Android Studio 실행**

2. **새 프로젝트 생성**
   - File > New > New Project
   - 또는 "New Project" 버튼 클릭

3. **템플릿 선택**
   - "Empty Activity" 선택
   - Next 클릭

4. **프로젝트 정보 입력**
   ```
   Name: APC GAP 기록관리
   Package name: com.apc.gap.record
   Save location: C:\Users\user\Desktop\webapp\android
   Language: Kotlin
   Minimum SDK: API 24 (Android 7.0)
   Build configuration language: Kotlin DSL (권장)
   ```

5. **Finish 클릭**
   - 프로젝트 생성 및 Gradle 동기화 대기 (처음엔 5-10분 소요)

6. **템플릿 파일 복사**
   - `android-template/MainActivity.kt` → `android/app/src/main/java/com/apc/gap/record/MainActivity.kt`
   - `android-template/activity_main.xml` → `android/app/src/main/res/layout/activity_main.xml`
   - `android-template/AndroidManifest.xml`의 내용을 기존 `AndroidManifest.xml`에 반영

### 방법 B: 명령줄로 생성 (고급)

```bash
cd C:\Users\user\Desktop\webapp
npx cap add android
npx cap sync android
```

## 4단계: MainActivity.kt 코드 수정

`android/app/src/main/java/com/apc/gap/record/MainActivity.kt` 파일을 열고:

```kotlin
// 서버 URL 수정
val serverUrl = "http://192.168.0.100:8787"  // 실제 서버 주소로 변경
```

또는 로컬 서버를 사용하지 않는 경우:
```kotlin
val serverUrl = "https://your-domain.com"  // 배포된 서버 주소
```

## 5단계: APK 빌드

### 방법 1: Android Studio GUI

1. **프로젝트 열기**
   - File > Open > `C:\Users\user\Desktop\webapp\android` 선택

2. **빌드 실행**
   - Build > Build Bundle(s) / APK(s) > Build APK(s)
   - 빌드 완료 대기 (1-3분)

3. **APK 위치 확인**
   - `android/app/build/outputs/apk/debug/app-debug.apk`

### 방법 2: 명령줄 (빠름)

```bash
cd C:\Users\user\Desktop\webapp\android
.\gradlew.bat assembleDebug
```

APK 파일 위치: `android/app/build/outputs/apk/debug/app-debug.apk`

## 6단계: APK 설치

### Android 기기에서
1. APK 파일을 모바일로 전송 (USB, 이메일, 클라우드 등)
2. 파일 관리자에서 APK 파일 찾기
3. 설치 허용 설정 (보안 > 알 수 없는 소스 허용)
4. APK 파일 탭하여 설치

## 문제 해결

### Gradle 동기화 실패
- File > Invalidate Caches / Restart
- 인터넷 연결 확인

### SDK 경로 오류
- File > Project Structure > SDK Location
- Android SDK Location 확인

### 빌드 오류
- Build > Clean Project
- Build > Rebuild Project

### "allowBackup" 오류
- `AndroidManifest.xml`에서 `android:allowBackup="true"` 확인

## APK 파일 위치

빌드 완료 후:
- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk` (서명 필요)

## 참고

- Debug APK는 개발/테스트용입니다
- Play Store 배포는 Release APK와 서명이 필요합니다
- WebView 기반 앱이므로 서버가 실행 중이어야 합니다
