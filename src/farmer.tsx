// 농가 페이지 HTML 템플릿

export function getFarmerDashboard() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="농가 대시보드 - APC GAP 기록관리">
    <meta name="theme-color" content="#16a34a">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
    <title>농가 대시보드</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">농가 대시보드</h1>
                <div class="flex items-center gap-3 sm:gap-4">
                    <a href="/admin" class="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition">관리자 대시보드</a>
                    <a href="/farmer" class="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition">농가 대시보드</a>
                    <a href="/" class="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition" onclick="localStorage.removeItem('auth_token'); localStorage.removeItem('user');">로그아웃</a>
                </div>
            </div>
        </div>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <!-- 탭 네비게이션 -->
        <div class="border-b border-gray-200 mb-4 sm:mb-6">
            <nav class="flex space-x-2 sm:space-x-4 overflow-x-auto">
                <button data-tab="daily" class="tab-btn active px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-green-600 border-b-2 border-green-600 whitespace-nowrap">
                    영농일지
                </button>
                <button data-tab="pesticide" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    방제 기록
                </button>
                <button data-tab="irrigation" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    관수 기록
                </button>
                <button data-tab="harvest" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    수확 기록
                </button>
                <button data-tab="bag" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    봉지 재배
                </button>
                <button data-tab="delivery" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    APC 입고 예약
                </button>
            </nav>
        </div>

        <!-- 영농일지 폼 -->
        <div id="daily-tab" class="tab-content bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">영농일지 작성</h2>
            <form id="dailyForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날짜 <span class="text-red-500">*</span></label>
                        <input type="date" name="date" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날씨 <span class="text-red-500">*</span></label>
                        <select name="weather" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                            <option value="">선택하세요</option>
                            <option value="맑음">맑음</option>
                            <option value="흐림">흐림</option>
                            <option value="비">비</option>
                            <option value="눈">눈</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">온도 (°C)</label>
                    <input type="number" name="temperature" step="0.1" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">작업 내용 <span class="text-red-500">*</span></label>
                    <textarea name="work_content" rows="4" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">메모</label>
                    <textarea name="memo" rows="2" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <button type="submit" class="w-full sm:w-auto px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium">
                    저장
                </button>
            </form>
        </div>

        <!-- 방제 기록 폼 -->
        <div id="pesticide-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">방제 기록 작성</h2>
            <form id="pesticideForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날짜 <span class="text-red-500">*</span></label>
                        <input type="date" name="date" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">품목</label>
                        <input type="text" id="pesticideCropName" readonly class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" value="자동 설정됨" />
                        <input type="hidden" name="crop_id" id="pesticideCropId" />
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">농약명 <span class="text-red-500">*</span></label>
                        <input type="text" name="pesticide_name" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 델란티" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">시용 면적 (m²) <span class="text-red-500">*</span></label>
                        <input type="number" name="application_area" step="0.01" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">희석 배수</label>
                        <input type="text" name="dilution_ratio" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 1000배" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날씨 <span class="text-red-500">*</span></label>
                        <select name="weather" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                            <option value="">선택하세요</option>
                            <option value="맑음">맑음</option>
                            <option value="흐림">흐림</option>
                            <option value="비">비</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">안전수확일 (일) <span class="text-red-500">*</span></label>
                        <input type="number" name="phi_days" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 7" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">안전수확일 (날짜)</label>
                        <input type="date" name="safe_harvest_date" readonly class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" />
                    </div>
                </div>
                <button type="submit" class="w-full sm:w-auto px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium">
                    저장
                </button>
            </form>
        </div>

        <!-- 관수 기록 폼 -->
        <div id="irrigation-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">관수 기록 작성</h2>
            <form id="irrigationForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날짜 <span class="text-red-500">*</span></label>
                        <input type="date" name="date" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">품목</label>
                        <input type="text" readonly class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" id="irrigationCropName" value="자동 설정됨" />
                        <input type="hidden" name="crop_id" id="irrigationCropId" />
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">관수량 (L) <span class="text-red-500">*</span></label>
                        <input type="number" name="amount" step="0.1" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">관수 방법 <span class="text-red-500">*</span></label>
                        <select name="method" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                            <option value="">선택하세요</option>
                            <option value="관수">관수</option>
                            <option value="스프링클러">스프링클러</option>
                            <option value="점적관수">점적관수</option>
                            <option value="분무">분무</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">메모</label>
                    <textarea name="memo" rows="3" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <button type="submit" class="w-full sm:w-auto px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium">
                    저장
                </button>
            </form>
        </div>

        <!-- 수확 기록 폼 -->
        <div id="harvest-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">수확 기록 작성</h2>
            <form id="harvestForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날짜 <span class="text-red-500">*</span></label>
                        <input type="date" name="date" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">품목</label>
                        <input type="text" readonly class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" id="harvestCropName" value="자동 설정됨" />
                        <input type="hidden" name="crop_id" id="harvestCropId" />
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">수확량 <span class="text-red-500">*</span></label>
                        <input type="number" name="quantity" step="0.01" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">단위 <span class="text-red-500">*</span></label>
                        <select name="unit" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                            <option value="">선택하세요</option>
                            <option value="kg">kg</option>
                            <option value="개">개</option>
                            <option value="상자">상자</option>
                            <option value="박스">박스</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">목적지</label>
                        <input type="text" name="destination" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 국내, 수출" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">메모</label>
                    <textarea name="memo" rows="2" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <button type="submit" class="w-full sm:w-auto px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium">
                    저장
                </button>
            </form>
        </div>

        <!-- 봉지 재배 폼 -->
        <div id="bag-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">봉지 재배 기록 작성</h2>
            <form id="bagForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">날짜 <span class="text-red-500">*</span></label>
                        <input type="date" name="date" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">품목</label>
                        <input type="text" readonly class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" id="bagCropName" value="자동 설정됨" />
                        <input type="hidden" name="crop_id" id="bagCropId" />
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">봉지 개수 <span class="text-red-500">*</span></label>
                        <input type="number" name="bag_count" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 100" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">재배 위치</label>
                        <input type="text" name="location" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 하우스 A구역" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">메모</label>
                    <textarea name="memo" rows="3" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <button type="submit" class="w-full sm:w-auto px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium">
                    저장
                </button>
            </form>
        </div>

        <!-- APC 입고 예약 폼 -->
        <div id="delivery-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">APC 입고 예약</h2>
            <form id="deliveryForm" class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">성함 <span class="text-red-500">*</span></label>
                        <input type="text" name="name" id="deliveryName" readonly required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" value="자동 입력됨" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">연락처 <span class="text-red-500">*</span></label>
                        <input type="text" name="contact" id="deliveryContact" readonly required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" value="자동 입력됨" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">소속 <span class="text-red-500">*</span></label>
                    <input type="text" name="affiliation" id="deliveryAffiliation" readonly required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg bg-gray-50" value="자동 입력됨" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">입고 예약날짜 <span class="text-red-500">*</span></label>
                        <input type="date" name="delivery_date" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">입고 예정 수량(컨테이너) <span class="text-red-500">*</span></label>
                        <input type="number" name="container_quantity" step="1" required class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="예: 1, 2" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">비고</label>
                    <textarea name="notes" rows="3" class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="입고 시 특이사항이나 요청사항을 입력하세요"></textarea>
                </div>
                <button type="submit" class="w-full sm:w-auto px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium">
                    입고 예약하기
                </button>
            </form>

            <!-- 예약 내역 -->
            <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">나의 입고 예약 내역</h3>
                <div id="deliveryList" class="space-y-2 sm:space-y-3">
                    <p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>
                </div>
            </div>
        </div>
    </main>

    <script>
        // 사용자 정보 로드 및 권한 확인
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        } else {
            const user = JSON.parse(userStr);
            
            // 권한 확인: 농가 역할이거나, 관리자이면서 농가 페이지 접근 권한이 있는 경우만 허용
            if (user.role !== 'farmer' && !(user.role === 'admin' && user.canAccessFarmerPages)) {
                alert('농가 대시보드에 접근할 권한이 없습니다.');
                window.location.href = '/';
            } else {
                const cropId = user.cropId || '';
                const cropName = user.cropName || '품목 미지정';
            
            // 모든 품목 필드에 자동 설정
            const setCropField = (id, name, cropId, cropName) => {
                const idField = document.getElementById(id);
                const nameField = document.getElementById(name);
                if (idField) idField.value = cropId;
                if (nameField) nameField.value = cropName;
            };
            setCropField('pesticideCropId', 'pesticideCropName', cropId, cropName);
            setCropField('irrigationCropId', 'irrigationCropName', cropId, cropName);
            setCropField('harvestCropId', 'harvestCropName', cropId, cropName);
            setCropField('bagCropId', 'bagCropName', cropId, cropName);
            
            // APC 입고 예약 폼 자동 입력 설정
            const nameField = document.getElementById('deliveryName');
            const contactField = document.getElementById('deliveryContact');
            const affiliationField = document.getElementById('deliveryAffiliation');
            
            if (nameField) nameField.value = user.username || '';
            if (contactField) contactField.value = user.phone || '';
            if (affiliationField) affiliationField.value = user.farmName || user.username || '';
            }
        }

        // 성공 메시지 표시 함수
        function showMessage(message, isSuccess = true) {
            const messageDiv = document.createElement('div');
            messageDiv.className = isSuccess 
                ? 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all'
                : 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all';
            messageDiv.textContent = message;
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 300);
            }, 3000);
        }

        // 탭 전환
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // 모든 탭 버튼 비활성화
                document.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active', 'text-green-600', 'border-green-600');
                    b.classList.add('text-gray-500', 'border-transparent');
                });
                
                // 클릭한 버튼 활성화
                this.classList.add('active', 'text-green-600', 'border-green-600');
                this.classList.remove('text-gray-500', 'border-transparent');
                
                // 모든 탭 콘텐츠 숨김
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                
                // 선택한 탭 콘텐츠 표시
                const content = document.getElementById(tabId + '-tab');
                if (content) {
                    content.classList.remove('hidden');
                }
            });
        });

        // 방제 기록 폼: 안전수확일 자동 계산
        document.getElementById('pesticideForm')?.addEventListener('input', function(e) {
            if (e.target.name === 'date' || e.target.name === 'phi_days') {
                const dateInput = this.querySelector('[name="date"]');
                const phiInput = this.querySelector('[name="phi_days"]');
                const safeDateInput = this.querySelector('[name="safe_harvest_date"]');
                
                if (dateInput.value && phiInput.value) {
                    const date = new Date(dateInput.value);
                    date.setDate(date.getDate() + parseInt(phiInput.value));
                    safeDateInput.value = date.toISOString().split('T')[0];
                }
            }
        });

        // 폼 제출 핸들러
        function setupFormSubmit(formId, apiEndpoint) {
            const form = document.getElementById(formId);
            if (!form) return;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                // 사용자 ID 추가
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    data.user_id = user.id;
                }
                
                try {
                    const response = await fetch(apiEndpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok && result.success) {
                        showMessage('저장되었습니다.', true);
                        e.target.reset();
                        
                        // 사용자 품목 정보 다시 설정
                        const userStr = localStorage.getItem('user');
                        if (userStr) {
                            const user = JSON.parse(userStr);
                            const cropId = user.cropId || '';
                            const cropName = user.cropName || '품목 미지정';
                            const cropIdField = e.target.querySelector('[name="crop_id"]');
                            if (cropIdField) {
                                cropIdField.value = cropId;
                            }
                        }
                    } else {
                        showMessage(result.message || '저장에 실패했습니다.', false);
                    }
                } catch (error) {
                    console.error('오류:', error);
                    showMessage('오류가 발생했습니다.', false);
                }
            });
        }

        // 각 폼에 제출 핸들러 설정
        setupFormSubmit('dailyForm', '/api/daily-records');
        setupFormSubmit('pesticideForm', '/api/pesticide-records');
        setupFormSubmit('irrigationForm', '/api/irrigation-records');
        setupFormSubmit('harvestForm', '/api/harvest-records');
        setupFormSubmit('bagForm', '/api/bag-records');
        
        // APC 입고 예약 폼
        const deliveryForm = document.getElementById('deliveryForm');
        if (deliveryForm) {
            deliveryForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                // 사용자 정보 추가
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    data.farmer_username = user.username;
                    data.farmer_id = user.id;
                }
                
                try {
                    const response = await fetch('/api/delivery-reservations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok && result.success) {
                        showMessage('입고 예약이 완료되었습니다.', true);
                        
                        // 날짜, 수량, 비고만 초기화 (자동 입력 필드는 유지)
                        const dateField = e.target.querySelector('[name="delivery_date"]');
                        const quantityField = e.target.querySelector('[name="container_quantity"]');
                        const notesField = e.target.querySelector('[name="notes"]');
                        if (dateField) dateField.value = '';
                        if (quantityField) quantityField.value = '';
                        if (notesField) notesField.value = '';
                        
                        // 자동 입력 필드 다시 설정
                        if (userStr) {
                            const user = JSON.parse(userStr);
                            document.getElementById('deliveryName').value = user.username || '';
                            document.getElementById('deliveryContact').value = user.phone || '';
                            document.getElementById('deliveryAffiliation').value = user.farmName || user.username || '';
                        }
                        
                        loadDeliveryList();
                    } else {
                        showMessage(result.message || '예약에 실패했습니다.', false);
                    }
                } catch (error) {
                    console.error('오류:', error);
                    showMessage('오류가 발생했습니다.', false);
                }
            });
        }

        // 입고 예약 목록 로드
        function loadDeliveryList() {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            
            const user = JSON.parse(userStr);
            const deliveryList = document.getElementById('deliveryList');
            deliveryList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>';
            
            fetch('/api/delivery-reservations?farmer_username=' + user.username)
                .then(res => res.json())
                .then(data => {
                    const reservations = data.reservations || [];
                    if (reservations.length > 0) {
                        deliveryList.innerHTML = reservations.map(res => \`
                            <div class="border border-gray-200 rounded-lg p-3 sm:p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="font-semibold text-sm sm:text-base text-gray-800">예약 #\${res.id}</h4>
                                    <span class="px-2 py-1 text-xs rounded \${res.status === 'confirmed' ? 'bg-green-100 text-green-700' : res.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">\${res.status === 'confirmed' ? '확정' : res.status === 'pending' ? '대기' : '취소'}</span>
                                </div>
                                <p class="text-xs sm:text-sm text-gray-600">
                                    <span class="font-medium">입고 예약날짜:</span> \${res.reservation_date || res.delivery_date || '-'}
                                </p>
                                <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                    <span class="font-medium">예정 수량(컨테이너):</span> \${res.expected_quantity_container || res.expected_quantity || 0}
                                </p>
                                \${res.notes ? '<p class="text-xs sm:text-sm text-gray-600 mt-1"><span class="font-medium">비고:</span> ' + res.notes + '</p>' : ''}
                            </div>
                        \`).join('');
                    } else {
                        deliveryList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">예약 내역이 없습니다.</p>';
                    }
                })
                .catch(err => {
                    console.error('예약 목록 로드 오류:', err);
                    deliveryList.innerHTML = '<p class="text-sm text-red-500 text-center py-4">로드 실패</p>';
                });
        }

        // 탭 전환 시 입고 예약 목록 로드
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                if (tabId === 'delivery') {
                    loadDeliveryList();
                }
            });
        });
    </script>
</body>
</html>
  `;
}
