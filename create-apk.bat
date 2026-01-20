@echo off
chcp 65001 >nul
echo ========================================
echo   APC GAP 기록관리 - APK 생성 스크립트
echo ========================================
echo.

REM Android Studio 설치 확인
echo [1/5] Android Studio 설치 확인 중...
set "ANDROID_STUDIO_PATH=%LOCALAPPDATA%\Programs\Android\Android Studio\bin\studio64.exe"
if not exist "%ANDROID_STUDIO_PATH%" (
    set "ANDROID_STUDIO_PATH=%ProgramFiles%\Android\Android Studio\bin\studio64.exe"
)

if not exist "%ANDROID_STUDIO_PATH%" (
    echo.
    echo ❌ Android Studio가 설치되어 있지 않습니다.
    echo.
    echo 📥 설치 방법:
    echo    1. https://developer.android.com/studio 접속
    echo    2. Android Studio 다운로드 및 설치
    echo    3. 설치 중 Android SDK 자동 설치됨
    echo    4. 설치 완료 후 이 스크립트를 다시 실행하세요
    echo.
    pause
    exit /b 1
)

echo ✓ Android Studio 발견: %ANDROID_STUDIO_PATH%
echo.

REM Android SDK 경로 확인
echo [2/5] Android SDK 경로 확인 중...
if defined ANDROID_HOME (
    set "SDK_PATH=%ANDROID_HOME%"
) else (
    set "SDK_PATH=%LOCALAPPDATA%\Android\Sdk"
)

if not exist "%SDK_PATH%" (
    echo ❌ Android SDK를 찾을 수 없습니다.
    echo    ANDROID_HOME 환경 변수를 설정하거나
    echo    Android Studio에서 SDK를 설치하세요.
    echo.
    pause
    exit /b 1
)

echo ✓ Android SDK 경로: %SDK_PATH%
echo.

REM Gradle 확인
echo [3/5] Gradle 확인 중...
where gradle >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Gradle이 PATH에 없습니다. (Android 프로젝트 내 Gradle Wrapper 사용)
) else (
    echo ✓ Gradle 발견
)
echo.

REM Android 프로젝트 디렉토리 생성
echo [4/5] Android 프로젝트 설정 중...
if not exist "android" (
    echo Android 프로젝트가 없습니다. 생성 중...
    echo.
    echo 📝 다음 단계를 따라주세요:
    echo.
    echo    1. Android Studio 실행
    echo    2. File ^> New ^> New Project
    echo    3. Empty Activity 선택
    echo    4. 다음 정보 입력:
    echo       - Name: APC GAP 기록관리
    echo       - Package name: com.apc.gap.record
    echo       - Language: Kotlin
    echo       - Minimum SDK: API 24 (Android 7.0)
    echo    5. Finish
    echo.
    echo    6. android-template 폴더의 파일들을 생성된 프로젝트에 복사:
    echo       - MainActivity.kt
    echo       - activity_main.xml  
    echo       - AndroidManifest.xml (일부 수정)
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Android 프로젝트 존재
)
echo.

REM APK 빌드
echo [5/5] APK 빌드 중...
cd android
if exist "gradlew.bat" (
    echo Gradle Wrapper로 빌드 중...
    call gradlew.bat assembleDebug
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ APK 빌드 완료!
        echo.
        if exist "app\build\outputs\apk\debug\app-debug.apk" (
            echo 📱 APK 파일 위치:
            echo    %CD%\app\build\outputs\apk\debug\app-debug.apk
            echo.
            echo 💡 이 파일을 모바일로 전송하여 설치하세요.
        )
    ) else (
        echo ❌ APK 빌드 실패
        echo    Android Studio에서 프로젝트를 열어 빌드하세요.
    )
) else (
    echo ❌ gradlew.bat을 찾을 수 없습니다.
    echo    Android Studio에서 프로젝트를 생성하세요.
)
echo.
cd ..
pause
