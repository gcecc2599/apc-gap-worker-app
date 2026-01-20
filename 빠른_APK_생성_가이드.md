# 🚀 빠른 APK 생성 가이드

## 현재 상태
✅ Android Studio 설치 완료
✅ 코드 템플릿 준비 완료

## 3단계로 APK 생성하기

### 1단계: Android Studio에서 프로젝트 생성 (5분)

1. **Android Studio 실행**
   - 시작 메뉴에서 "Android Studio" 검색 후 실행
   - 또는: `C:\Program Files\Android\Android Studio\bin\studio64.exe`

2. **새 프로젝트 생성**
   ```
   File > New > New Project
   → "Empty Activity" 선택
   → Next
   ```

3. **프로젝트 정보 입력**
   ```
   Name: APC GAP 기록관리
   Package name: com.apc.gap.record
   Save location: C:\Users\user\Desktop\webapp\android
   Language: Kotlin
   Minimum SDK: API 24 (Android 7.0)
   → Finish
   ```

4. **Gradle 동기화 대기** (처음엔 5-10분 소요)

### 2단계: 템플릿 코드 적용 (2분)

1. **MainActivity.kt 교체**
   - `android-template/MainActivity.kt` 파일 열기
   - 내용 복사
   - `android/app/src/main/java/com/apc/gap/record/MainActivity.kt` 파일 열기
   - 기존 내용 삭제 후 붙여넣기

2. **activity_main.xml 교체**
   - `android-template/activity_main.xml` 파일 열기
   - 내용 복사
   - `android/app/src/main/res/layout/activity_main.xml` 파일 열기
   - 기존 내용 삭제 후 붙여넣기

3. **AndroidManifest.xml 수정**
   - `android/app/src/main/AndroidManifest.xml` 파일 열기
   - `<application>` 태그에 다음 추가:
     ```xml
     android:usesCleartextTraffic="true"
     ```
   - `<manifest>` 태그에 다음 추가:
     ```xml
     <uses-permission android:name="android.permission.INTERNET" />
     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
     ```

4. **서버 URL 설정**
   - `MainActivity.kt` 파일에서 다음 줄 찾기:
     ```kotlin
     val serverUrl = "http://192.168.0.100:8787"
     ```
   - 실제 서버 주소로 변경
     - 로컬 네트워크: `http://[PC의 IP주소]:8787`
     - 온라인 배포: `https://your-domain.com`

### 3단계: APK 빌드 (3분)

**방법 1: Android Studio GUI**
```
Build > Build Bundle(s) / APK(s) > Build APK(s)
→ 빌드 완료 대기
→ "locate" 클릭하여 APK 파일 위치 확인
```

**방법 2: 명령줄 (더 빠름)**
```powershell
cd C:\Users\user\Desktop\webapp\android
.\gradlew.bat assembleDebug
```

**APK 파일 위치:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 완료! 🎉

생성된 APK 파일을:
- 모바일로 전송 (USB, 이메일, 클라우드 등)
- 파일 관리자에서 APK 파일 찾기
- 설치 허용 설정 (보안 > 알 수 없는 소스 허용)
- APK 파일 탭하여 설치

## 문제 해결

### Gradle 동기화 실패
- File > Invalidate Caches / Restart
- 인터넷 연결 확인

### 빌드 오류
- Build > Clean Project
- Build > Rebuild Project

### 서버 연결 안 됨
- PC와 모바일이 같은 Wi-Fi에 연결되어 있는지 확인
- PC의 방화벽에서 포트 8787 허용 확인
- 서버가 실행 중인지 확인 (`npm run dev`)

## 참고

- Debug APK는 개발/테스트용입니다
- Play Store 배포는 Release APK와 서명이 필요합니다
- WebView 기반 앱이므로 서버가 실행 중이어야 합니다
