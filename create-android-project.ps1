# Android 프로젝트 자동 생성 스크립트

Write-Host "========================================"
Write-Host "  Android 프로젝트 생성 스크립트"
Write-Host "========================================"
Write-Host ""

$projectPath = Join-Path $PSScriptRoot "android"
$templatePath = Join-Path $PSScriptRoot "android-template"

# Android Studio 경로 확인
$studioPath = "$env:LOCALAPPDATA\Programs\Android\Android Studio\bin\studio64.exe"
if (-not (Test-Path $studioPath)) {
    $studioPath = "${env:ProgramFiles}\Android\Android Studio\bin\studio64.exe"
}

if (-not (Test-Path $studioPath)) {
    Write-Host "❌ Android Studio를 찾을 수 없습니다."
    Write-Host "   Android Studio가 설치되어 있는지 확인하세요."
    exit 1
}

Write-Host "✅ Android Studio 발견: $studioPath"
Write-Host ""

# Android 프로젝트가 이미 있는지 확인
if (Test-Path $projectPath) {
    Write-Host "⚠️  android 폴더가 이미 존재합니다."
    Write-Host "   기존 프로젝트를 사용하거나 삭제 후 다시 생성하세요."
    Write-Host ""
    Write-Host "기존 프로젝트를 사용하려면:"
    Write-Host "  cd android"
    Write-Host "  .\gradlew.bat assembleDebug"
    Write-Host ""
    exit 0
}

Write-Host "📝 Android Studio에서 수동으로 프로젝트를 생성해야 합니다."
Write-Host ""
Write-Host "다음 단계를 따라주세요:"
Write-Host ""
Write-Host "1. Android Studio 실행 (이미 실행 중이면 다음 단계로)"
Write-Host ""
Write-Host "2. 새 프로젝트 생성:"
Write-Host "   - File > New > New Project"
Write-Host "   - 'Empty Activity' 선택"
Write-Host "   - Next 클릭"
Write-Host ""
Write-Host "3. 프로젝트 설정:"
Write-Host "   - Name: APC GAP 기록관리"
Write-Host "   - Package name: com.apc.gap.record"
Write-Host "   - Save location: $projectPath"
Write-Host "   - Language: Kotlin"
Write-Host "   - Minimum SDK: API 24 (Android 7.0)"
Write-Host "   - Finish 클릭"
Write-Host ""
Write-Host "4. 프로젝트 생성 완료 후:"
Write-Host "   - android-template 폴더의 파일들을 복사:"
Write-Host "     * MainActivity.kt → android/app/src/main/java/com/apc/gap/record/"
Write-Host "     * activity_main.xml → android/app/src/main/res/layout/"
Write-Host "     * AndroidManifest.xml 내용을 기존 파일에 반영"
Write-Host ""
Write-Host "5. 서버 URL 설정:"
Write-Host "   - MainActivity.kt 파일에서 serverUrl 변수 수정"
Write-Host "   - 예: val serverUrl = `"http://192.168.0.100:8787`""
Write-Host ""
Write-Host "6. APK 빌드:"
Write-Host "   - Build > Build Bundle(s) / APK(s) > Build APK(s)"
Write-Host "   - 또는: cd android && .\gradlew.bat assembleDebug"
Write-Host ""

# Android Studio 실행 제안
$response = Read-Host "Android Studio를 지금 실행하시겠습니까? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "🚀 Android Studio 실행 중..."
    Start-Process $studioPath
    Write-Host "✅ Android Studio가 실행되었습니다."
    Write-Host "   위의 단계를 따라 프로젝트를 생성하세요."
}

Write-Host ""
Write-Host "상세 가이드: android-setup-guide.md 파일 참고"
Write-Host ""
