@echo off
chcp 65001 >nul
echo ========================================
echo   Android Studio 자동 설치 안내
echo ========================================
echo.

echo Android Studio는 GUI 설치 프로그램이므로
echo 자동 설치가 제한적입니다.
echo.
echo 다음 방법 중 하나를 선택하세요:
echo.
echo [방법 1] 웹에서 직접 다운로드 (추천)
echo    1. 브라우저에서 다음 주소 열기:
echo       https://developer.android.com/studio
echo    2. "Download Android Studio" 클릭
echo    3. 설치 프로그램 실행
echo.
echo [방법 2] winget 사용 (Windows 10/11)
echo    winget install Google.AndroidStudio
echo.
echo [방법 3] Chocolatey 사용
echo    choco install androidstudio
echo.
echo.
echo 설치 후 이 창을 닫고 다음을 실행하세요:
echo   - android-setup-guide.md 파일 참고
echo   - 또는 create-apk.bat 실행
echo.
pause

REM winget 설치 시도 (사용자가 선택한 경우)
if "%1"=="winget" (
    echo.
    echo winget으로 설치를 시도합니다...
    winget install Google.AndroidStudio
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Android Studio 설치 완료!
        echo    설치 후 Android Studio를 실행하여 설정을 완료하세요.
    ) else (
        echo.
        echo ❌ winget 설치 실패
        echo    웹에서 수동으로 다운로드하세요.
    )
    pause
    exit /b
)

REM 웹 페이지 열기
echo.
echo 브라우저에서 다운로드 페이지를 엽니다...
start https://developer.android.com/studio
echo.
echo 다운로드 페이지가 열렸습니다.
echo 설치 완료 후 안내를 따르세요.
echo.
pause
