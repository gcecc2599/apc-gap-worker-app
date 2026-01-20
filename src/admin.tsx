// 관리자 대시보드 HTML 템플릿

export function getAdminDashboard() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="관리자 대시보드 - APC GAP 기록관리">
    <meta name="theme-color" content="#16a34a">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
    <title>관리자 대시보드</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.skypack.dev/exceljs@4.4.0"></script>
    <script src="https://cdn.skypack.dev/jspdf@2.5.1"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">관리자 대시보드</h1>
                <div class="flex items-center gap-3 sm:gap-4">
                    <a href="/admin" class="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition">관리자 대시보드</a>
                    <a href="/farmer" class="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition">농가 대시보드</a>
                    <span id="userInfo" class="text-xs sm:text-sm text-gray-600"></span>
                    <a href="/" class="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition" onclick="localStorage.removeItem('auth_token'); localStorage.removeItem('user');">로그아웃</a>
                </div>
            </div>
        </div>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <!-- 환영 메시지 -->
        <div class="bg-white rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2">환영합니다, <span id="adminName">관리자</span>님!</h2>
            <p class="text-gray-600 text-sm sm:text-base">관리자 대시보드에서 시스템을 관리할 수 있습니다.</p>
        </div>

        <!-- 통계 카드 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div class="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-lg transition" onclick="window.location.href='/admin/farmers'">
                <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-2">총 농가 수</h3>
                <p class="text-2xl sm:text-3xl font-bold text-green-600" id="totalFarmers">-</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-lg transition" onclick="window.location.href='/admin/records'">
                <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-2">총 기록 수</h3>
                <p class="text-2xl sm:text-3xl font-bold text-blue-600" id="totalRecords">-</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-lg transition" onclick="window.location.href='/admin/today-records'">
                <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-2">오늘 기록</h3>
                <p class="text-2xl sm:text-3xl font-bold text-purple-600" id="todayRecords">-</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-lg transition" onclick="window.location.href='/admin/users'">
                <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-2">활성 사용자</h3>
                <p class="text-2xl sm:text-3xl font-bold text-orange-600" id="activeUsers">-</p>
            </div>
        </div>

        <!-- 탭 네비게이션 -->
        <div class="border-b border-gray-200 mb-4 sm:mb-6">
            <nav class="flex space-x-2 sm:space-x-4 overflow-x-auto">
                <button data-tab="users" class="tab-btn active px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-green-600 border-b-2 border-green-600 whitespace-nowrap">
                    사용자 관리
                </button>
                <button data-tab="records" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    기록 관리
                </button>
                <button data-tab="stats" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    통계 조회
                </button>
                <button data-tab="delivery" class="tab-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                    입고 예약 관리
                </button>
            </nav>
        </div>

        <!-- 사용자 관리 탭 -->
        <div id="users-tab" class="tab-content bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">사용자 관리</h2>
            
            <!-- 하위 탭: 관리자/농가 구분 -->
            <div class="border-b border-gray-200 mb-4 sm:mb-6">
                <nav class="flex space-x-2 sm:space-x-4 overflow-x-auto">
                    <button data-user-type="admin" class="user-type-btn active px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
                        관리자
                    </button>
                    <button data-user-type="farmer" class="user-type-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent whitespace-nowrap">
                        농가
                    </button>
                </nav>
            </div>

            <!-- 관리자 관리 섹션 -->
            <div id="admin-section" class="user-section">
                <div class="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 class="text-base sm:text-lg font-medium text-gray-800">관리자 목록</h3>
                    <button id="refreshAdmins" class="px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                        새로고침
                    </button>
                </div>
                <div id="adminList" class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>
                </div>

                <!-- 새 관리자 추가 -->
                <div class="border-t border-gray-200 pt-4 sm:pt-6">
                    <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">새 관리자 추가</h3>
                    <form id="createAdminForm" class="space-y-3 sm:space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">사용자명 <span class="text-red-500">*</span></label>
                                <input type="text" name="username" required class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">비밀번호 <span class="text-red-500">*</span></label>
                                <input type="password" name="password" required class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <input type="hidden" name="role" value="admin" />
                        <button type="submit" class="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm font-medium">
                            관리자 추가
                        </button>
                    </form>
                </div>
            </div>

            <!-- 농가 관리 섹션 -->
            <div id="farmer-section" class="user-section hidden">
                <div class="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 class="text-base sm:text-lg font-medium text-gray-800">농가 목록</h3>
                    <button id="refreshFarmers" class="px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                        새로고침
                    </button>
                </div>
                <div id="farmerList" class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>
                </div>

                <!-- 새 농가 추가 -->
                <div class="border-t border-gray-200 pt-4 sm:pt-6">
                    <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">새 농가 추가</h3>
                    <form id="createFarmerForm" class="space-y-3 sm:space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">사용자명 <span class="text-red-500">*</span></label>
                                <input type="text" name="username" required class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">비밀번호 <span class="text-red-500">*</span></label>
                                <input type="password" name="password" required class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">농가명</label>
                                <input type="text" name="farm_name" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">연락처</label>
                                <input type="text" name="phone" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">품목 ID <span class="text-red-500">*</span></label>
                                <select name="crop_id" required class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                                    <option value="">선택하세요</option>
                                    <option value="1">1 - 샤인머스켓</option>
                                    <option value="2">2 - 사과</option>
                                    <option value="3">3 - 딸기</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">품목명</label>
                                <input type="text" name="crop_name" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="자동 입력됨" readonly />
                            </div>
                        </div>
                        <input type="hidden" name="role" value="farmer" />
                        <button type="submit" class="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs sm:text-sm font-medium">
                            농가 추가
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- 기록 관리 탭 -->
        <div id="records-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">기록 관리</h2>
            
            <!-- 농가 선택 및 다운로드 버튼 -->
            <div class="mb-4 sm:mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <select id="farmerSelect" class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">전체 농가</option>
                </select>
                <div class="flex gap-2">
                    <button id="downloadExcel" class="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                        Excel 다운로드
                    </button>
                    <button id="downloadPDF" class="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
                        PDF 다운로드
                    </button>
                </div>
                <div class="flex gap-2">
                    <select id="gapTypeSelect" class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                        <option value="korean">한국 GAP</option>
                        <option value="global">Global GAP</option>
                    </select>
                </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <button data-record-type="daily" class="record-type-btn active px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition">
                    영농일지
                </button>
                <button data-record-type="pesticide" class="record-type-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    방제 기록
                </button>
                <button data-record-type="irrigation" class="record-type-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    관수 기록
                </button>
                <button data-record-type="harvest" class="record-type-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    수확 기록
                </button>
                <button data-record-type="bag" class="record-type-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    봉지 재배
                </button>
            </div>

            <div id="recordsList" class="space-y-3 sm:space-y-4">
                <p class="text-sm text-gray-500 text-center py-4">기록 타입을 선택하세요.</p>
            </div>
        </div>

        <!-- 통계 조회 탭 -->
        <div id="stats-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">통계 조회</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div class="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">사용자 통계</h3>
                    <div class="space-y-2 sm:space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">총 사용자</span>
                            <span class="text-base sm:text-lg font-semibold text-gray-800" id="statsTotalUsers">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">농가</span>
                            <span class="text-base sm:text-lg font-semibold text-green-600" id="statsFarmers">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">관리자</span>
                            <span class="text-base sm:text-lg font-semibold text-blue-600" id="statsAdmins">-</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">기록 통계</h3>
                    <div class="space-y-2 sm:space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">영농일지</span>
                            <span class="text-base sm:text-lg font-semibold text-gray-800" id="statsDaily">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">방제 기록</span>
                            <span class="text-base sm:text-lg font-semibold text-gray-800" id="statsPesticide">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">관수 기록</span>
                            <span class="text-base sm:text-lg font-semibold text-gray-800" id="statsIrrigation">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">수확 기록</span>
                            <span class="text-base sm:text-lg font-semibold text-gray-800" id="statsHarvest">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 입고 예약 관리 탭 -->
        <div id="delivery-tab" class="tab-content hidden bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">APC 입고 예약 관리</h2>
            
            <!-- 필터 -->
            <div class="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-4">
                <select id="deliveryStatusFilter" class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">전체 상태</option>
                    <option value="pending">대기</option>
                    <option value="confirmed">확정</option>
                    <option value="cancelled">취소</option>
                </select>
                <input type="date" id="deliveryDateFilter" class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="날짜 필터" />
                <button id="refreshDeliveries" class="px-3 py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                    새로고침
                </button>
            </div>

            <!-- 예약 목록 -->
            <div id="deliveryList" class="space-y-3 sm:space-y-4">
                <p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>
            </div>
        </div>

        <!-- 농가 대시보드 링크 -->
        <div class="mt-4 sm:mt-6 bg-white rounded-lg shadow p-4 sm:p-6">
            <a href="/farmer" class="inline-flex items-center text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline transition">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                농가 대시보드로 이동
            </a>
        </div>
    </main>

    <script>
        // 사용자 정보 로드 및 권한 확인
        let userLoaded = false;
        let currentUser = null;
        let currentRecordType = 'daily'; // 기본값 설정
        
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                currentUser = JSON.parse(userStr);
                
                // 관리자 역할 확인 - 농가 계정이면 접근 차단
                if (currentUser.role !== 'admin') {
                    alert('관리자 대시보드는 관리자 계정만 접근할 수 있습니다.');
                    window.location.href = '/';
                    throw new Error('권한 없음');
                }
                
                const adminNameEl = document.getElementById('adminName');
                const userInfoEl = document.getElementById('userInfo');
                if (adminNameEl) adminNameEl.textContent = currentUser.username || '관리자';
                if (userInfoEl) userInfoEl.textContent = currentUser.username + ' (' + currentUser.role + ')';
                userLoaded = true;
            } else {
                // 인증되지 않았으면 로그인 페이지로 리다이렉트
                alert('로그인이 필요합니다.');
                window.location.href = '/';
            }
        } catch (error) {
            if (error.message !== '권한 없음') {
                console.error('사용자 정보 로드 오류:', error);
                alert('오류가 발생했습니다. 메인 페이지로 이동합니다.');
                window.location.href = '/';
            }
        }

        // 탭 전환
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                document.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active', 'text-green-600', 'border-green-600');
                    b.classList.add('text-gray-500', 'border-transparent');
                });
                
                this.classList.add('active', 'text-green-600', 'border-green-600');
                this.classList.remove('text-gray-500', 'border-transparent');
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                
                const content = document.getElementById(tabId + '-tab');
                if (content) {
                    content.classList.remove('hidden');
                }

                // 탭별 데이터 로드
                if (tabId === 'users') {
                    loadAdmins();
                    loadFarmers();
                } else if (tabId === 'records') {
                    loadRecords('daily');
                } else if (tabId === 'stats') {
                    loadStats();
                } else if (tabId === 'delivery') {
                    loadDeliveryReservations();
                }
            });
        });

        // 사용자 타입 버튼 전환 (관리자/농가)
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userType = this.getAttribute('data-user-type');
                
                document.querySelectorAll('.user-type-btn').forEach(b => {
                    b.classList.remove('active', 'text-blue-600', 'border-blue-600', 'text-green-600', 'border-green-600');
                    b.classList.add('text-gray-500', 'border-transparent');
                });
                
                if (userType === 'admin') {
                    this.classList.add('active', 'text-blue-600', 'border-blue-600');
                } else {
                    this.classList.add('active', 'text-green-600', 'border-green-600');
                }
                this.classList.remove('text-gray-500', 'border-transparent');
                
                document.querySelectorAll('.user-section').forEach(section => {
                    section.classList.add('hidden');
                });
                
                if (userType === 'admin') {
                    document.getElementById('admin-section')?.classList.remove('hidden');
                } else {
                    document.getElementById('farmer-section')?.classList.remove('hidden');
                }
            });
        });

        // 기록 타입 버튼 전환
        document.querySelectorAll('.record-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const recordType = this.getAttribute('data-record-type');
                currentRecordType = recordType;
                
                document.querySelectorAll('.record-type-btn').forEach(b => {
                    b.classList.remove('active', 'bg-green-50', 'text-green-700');
                    b.classList.add('bg-gray-100', 'text-gray-700');
                });
                
                this.classList.add('active', 'bg-green-50', 'text-green-700');
                this.classList.remove('bg-gray-100', 'text-gray-700');
                
                loadRecords(recordType);
            });
        });

        // 통계 데이터 로드
        function loadStats() {
            fetch('/api/admin/dashboard/stats')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('totalFarmers').textContent = data.total_farmers || '0';
                    document.getElementById('totalRecords').textContent = data.total_records || '0';
                    document.getElementById('todayRecords').textContent = data.today_records || '0';
                    document.getElementById('activeUsers').textContent = data.active_users || '0';
                    
                    // 통계 탭 데이터
                    document.getElementById('statsTotalUsers').textContent = data.active_users || '0';
                    document.getElementById('statsFarmers').textContent = data.total_farmers || '0';
                    document.getElementById('statsAdmins').textContent = (data.active_users - data.total_farmers) || '0';
                    document.getElementById('statsDaily').textContent = data.daily_records || '0';
                    document.getElementById('statsPesticide').textContent = data.pesticide_records || '0';
                    document.getElementById('statsIrrigation').textContent = data.irrigation_records || '0';
                    document.getElementById('statsHarvest').textContent = data.harvest_records || '0';
                })
                .catch(err => {
                    console.error('통계 로드 오류:', err);
                    document.getElementById('totalFarmers').textContent = '0';
                    document.getElementById('totalRecords').textContent = '0';
                    document.getElementById('todayRecords').textContent = '0';
                    document.getElementById('activeUsers').textContent = '0';
                });
        }

        // 관리자 목록 로드
        function loadAdmins() {
            fetch('/api/users')
                .then(res => res.json())
                .then(data => {
                    const adminList = document.getElementById('adminList');
                    const admins = (data.users || []).filter(user => user.role === 'admin');
                    if (admins.length > 0) {
                        adminList.innerHTML = admins.map(user => \`
                            <div class="border border-blue-200 bg-blue-50 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                                <div>
                                    <h4 class="font-semibold text-sm sm:text-base text-gray-800">\${user.username}</h4>
                                    <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                        <span class="font-medium text-blue-600">관리자</span>
                                        <span class="text-gray-400 mx-2">|</span>
                                        <span class="text-xs text-gray-500">ID: \${user.id}</span>
                                    </p>
                                </div>
                                <button onclick="deleteUser('\${user.username}')" class="px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition">
                                    삭제
                                </button>
                            </div>
                        \`).join('');
                    } else {
                        adminList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">관리자가 없습니다.</p>';
                    }
                })
                .catch(err => {
                    console.error('관리자 목록 로드 오류:', err);
                    document.getElementById('adminList').innerHTML = '<p class="text-sm text-red-500 text-center py-4">로드 실패</p>';
                });
        }

        // 농가 목록 로드
        function loadFarmers() {
            fetch('/api/users')
                .then(res => res.json())
                .then(data => {
                    const farmerList = document.getElementById('farmerList');
                    const farmers = (data.users || []).filter(user => user.role === 'farmer');
                    if (farmers.length > 0) {
                        farmerList.innerHTML = farmers.map(user => \`
                            <div class="border border-green-200 bg-green-50 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-sm sm:text-base text-gray-800">\${user.username}</h4>
                                    <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                        <span class="font-medium text-green-600">농가</span>
                                        \${user.farm_name ? '<span class="text-gray-400 mx-2">|</span><span>농가명: ' + user.farm_name + '</span>' : ''}
                                        \${user.cropName ? '<span class="text-gray-400 mx-2">|</span><span>품목: ' + user.cropName + '</span>' : ''}
                                    </p>
                                </div>
                                <button onclick="deleteUser('\${user.username}')" class="px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition">
                                    삭제
                                </button>
                            </div>
                        \`).join('');
                    } else {
                        farmerList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">농가가 없습니다.</p>';
                    }
                })
                .catch(err => {
                    console.error('농가 목록 로드 오류:', err);
                    document.getElementById('farmerList').innerHTML = '<p class="text-sm text-red-500 text-center py-4">로드 실패</p>';
                });
        }

        // 사용자 목록 로드 (호환성 유지)
        function loadUsers() {
            loadAdmins();
            loadFarmers();
        }

        // 기록 목록 로드
        function loadRecords(type) {
            const endpoint = '/api/' + type + '-records';
            const recordsList = document.getElementById('recordsList');
            recordsList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>';

            // 사용자 정보도 함께 가져오기
            Promise.all([
                fetch(endpoint).then(res => res.json()),
                fetch('/api/users').then(res => res.json())
            ])
                .then(([recordsData, usersData]) => {
                    const records = recordsData.records || [];
                    const users = usersData.users || [];
                    const userMap = new Map(users.map(u => [u.id, u]));
                    
                    if (records.length > 0) {
                        recordsList.innerHTML = records.map(record => {
                            const user = userMap.get(record.user_id);
                            const userName = user ? user.username : '알 수 없음';
                            const farmName = user && user.farm_name ? user.farm_name : '';
                            
                            let content = '';
                            if (type === 'daily') {
                                content = \`날씨: \${record.weather || '-'}, 작업내용: \${record.work_content || '-'}\`;
                            } else if (type === 'pesticide') {
                                content = \`농약명: \${record.pesticide_name || '-'}, 면적: \${record.application_area || 0}㎡, 안전수확일: \${record.safe_harvest_date || '-'}\`;
                            } else if (type === 'irrigation') {
                                content = \`관수량: \${record.amount || 0}, 방법: \${record.method || '-'}\`;
                            } else if (type === 'harvest') {
                                content = \`수확량: \${record.quantity || 0} \${record.unit || 'kg'}, 출하지: \${record.destination || '-'}\`;
                            } else if (type === 'bag') {
                                content = \`봉지 수: \${record.bag_count || 0}, 위치: \${record.location || '-'}\`;
                            }
                            
                            return \`
                            <div class="border border-gray-200 rounded-lg p-3 sm:p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="font-semibold text-sm sm:text-base text-gray-800">기록 #\${record.id}</h4>
                                    <span class="text-xs text-gray-500">\${record.date || record.created_at}</span>
                                </div>
                                <div class="text-xs sm:text-sm text-gray-600 mb-2">
                                    <span class="font-medium">농가:</span> \${userName} \${farmName ? '(' + farmName + ')' : ''}
                                </div>
                                <div class="text-xs sm:text-sm text-gray-700">
                                    \${content}
                                </div>
                            </div>
                            \`;
                        }).join('');
                    } else {
                        recordsList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">기록이 없습니다.</p>';
                    }
                })
                .catch(err => {
                    console.error('기록 로드 오류:', err);
                    recordsList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">기록 타입: ' + type + '</p>';
                });
        }

        // 사용자 삭제
        function deleteUser(username) {
            if (!confirm('정말 ' + username + ' 사용자를 삭제하시겠습니까?')) {
                return;
            }

            fetch('/api/users/' + username, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert('삭제되었습니다.');
                        loadUsers();
                    } else {
                        alert('삭제에 실패했습니다.');
                    }
                })
                .catch(err => {
                    console.error('삭제 오류:', err);
                    alert('오류가 발생했습니다.');
                });
        }

        // 새 관리자 추가 폼
        document.getElementById('createAdminForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    alert('관리자가 추가되었습니다.');
                    e.target.reset();
                    loadAdmins();
                } else {
                    alert(result.message || '관리자 추가에 실패했습니다.');
                }
            } catch (error) {
                console.error('오류:', error);
                alert('오류가 발생했습니다.');
            }
        });

        // 새 농가 추가 폼
        document.getElementById('createFarmerForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    alert('농가가 추가되었습니다.');
                    e.target.reset();
                    loadFarmers();
                } else {
                    alert(result.message || '농가 추가에 실패했습니다.');
                }
            } catch (error) {
                console.error('오류:', error);
                alert('오류가 발생했습니다.');
            }
        });

        // 새로고침 버튼
        document.getElementById('refreshAdmins')?.addEventListener('click', loadAdmins);
        document.getElementById('refreshFarmers')?.addEventListener('click', loadFarmers);

        // 농가 폼: 품목 ID 선택 시 품목명 자동 입력
        document.querySelector('#createFarmerForm [name="crop_id"]')?.addEventListener('change', function() {
            const cropNameField = document.querySelector('#createFarmerForm [name="crop_name"]');
            const cropNames = {
                '1': '샤인머스켓',
                '2': '사과',
                '3': '딸기'
            };
            if (cropNameField && this.value) {
                cropNameField.value = cropNames[this.value] || '';
            }
        });

        // 입고 예약 목록 로드
        function loadDeliveryReservations(status = '', date = '') {
            const deliveryList = document.getElementById('deliveryList');
            if (!deliveryList) return;
            
            deliveryList.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">로딩 중...</p>';
            
            let url = '/api/delivery-reservations';
            const params = [];
            if (status) params.push('status=' + status);
            if (date) params.push('date=' + date);
            if (params.length > 0) url += '?' + params.join('&');
            
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const reservations = data.reservations || [];
                    if (reservations.length > 0) {
                        deliveryList.innerHTML = reservations.map(res => \`
                            <div class="border border-gray-200 rounded-lg p-3 sm:p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 class="font-semibold text-sm sm:text-base text-gray-800">예약 #\${res.id}</h4>
                                        <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                            <span class="font-medium">농가:</span> \${res.farmer_username || 'N/A'}
                                        </p>
                                    </div>
                                    <span class="px-2 py-1 text-xs rounded \${res.status === 'confirmed' ? 'bg-green-100 text-green-700' : res.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">\${res.status === 'confirmed' ? '확정' : res.status === 'pending' ? '대기' : '취소'}</span>
                                </div>
                                <p class="text-xs sm:text-sm text-gray-600">
                                    <span class="font-medium">입고 예약날짜:</span> \${res.reservation_date || '-'}
                                </p>
                                <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                    <span class="font-medium">예정 수량(컨테이너):</span> \${res.expected_quantity_container || 0}
                                </p>
                                <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                    <span class="font-medium">성함:</span> \${res.farmer_name || '-'}
                                </p>
                                <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                    <span class="font-medium">연락처:</span> \${res.contact_phone || '-'}
                                </p>
                                <p class="text-xs sm:text-sm text-gray-600 mt-1">
                                    <span class="font-medium">소속:</span> \${res.affiliation || '-'}
                                </p>
                                \${res.notes ? '<p class="text-xs sm:text-sm text-gray-600 mt-1"><span class="font-medium">비고:</span> ' + res.notes + '</p>' : ''}
                                <div class="mt-3 flex gap-2">
                                    \${res.status === 'pending' ? '<button onclick="updateDeliveryStatus(' + res.id + ', \\'confirmed\\')" class="px-3 py-1.5 text-xs sm:text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition">확정</button>' : ''}
                                    \${res.status !== 'cancelled' ? '<button onclick="updateDeliveryStatus(' + res.id + ', \\'cancelled\\')" class="px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition">취소</button>' : ''}
                                </div>
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

        // 예약 상태 업데이트
        function updateDeliveryStatus(id, status) {
            if (!confirm('예약 상태를 변경하시겠습니까?')) return;
            
            fetch('/api/delivery-reservations/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert('상태가 변경되었습니다.');
                        const statusFilter = document.getElementById('deliveryStatusFilter')?.value || '';
                        const dateFilter = document.getElementById('deliveryDateFilter')?.value || '';
                        loadDeliveryReservations(statusFilter, dateFilter);
                    } else {
                        alert(data.message || '상태 변경에 실패했습니다.');
                    }
                })
                .catch(err => {
                    console.error('상태 변경 오류:', err);
                    alert('오류가 발생했습니다.');
                });
        }

        // 필터 변경 이벤트
        document.getElementById('deliveryStatusFilter')?.addEventListener('change', function() {
            const status = this.value;
            const date = document.getElementById('deliveryDateFilter')?.value || '';
            loadDeliveryReservations(status, date);
        });

        document.getElementById('deliveryDateFilter')?.addEventListener('change', function() {
            const date = this.value;
            const status = document.getElementById('deliveryStatusFilter')?.value || '';
            loadDeliveryReservations(status, date);
        });

        document.getElementById('refreshDeliveries')?.addEventListener('click', function() {
            const status = document.getElementById('deliveryStatusFilter')?.value || '';
            const date = document.getElementById('deliveryDateFilter')?.value || '';
            loadDeliveryReservations(status, date);
        });

        // 다운로드 기능
        document.getElementById('downloadExcel')?.addEventListener('click', async function() {
            if (!currentRecordType) {
                alert('기록 타입을 먼저 선택하세요.');
                return;
            }
            
            try {
                const endpoint = '/api/' + currentRecordType + '-records';
                const response = await fetch(endpoint);
                const data = await response.json();
                const records = data.records || [];
                
                if (records.length === 0) {
                    alert('다운로드할 기록이 없습니다.');
                    return;
                }
                
                // ExcelJS를 사용하여 Excel 파일 생성
                // Skypack CDN에서 로드된 ExcelJS 사용
                const ExcelJSModule = await import('https://cdn.skypack.dev/exceljs@4.4.0');
                const ExcelJS = ExcelJSModule.default || ExcelJSModule;
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('기록');
                
                // 헤더 설정
                let headers = [];
                if (currentRecordType === 'daily') {
                    headers = ['날짜', '농가명', '날씨', '온도', '작업내용', '메모'];
                } else if (currentRecordType === 'pesticide') {
                    headers = ['날짜', '농가명', '품목', '농약명', '면적(㎡)', '희석배수', '날씨', '안전수확일', 'PHI(일)'];
                } else if (currentRecordType === 'irrigation') {
                    headers = ['날짜', '농가명', '품목', '수량', '방법', '메모'];
                } else if (currentRecordType === 'harvest') {
                    headers = ['날짜', '농가명', '품목', '수량', '단위', '목적지', '메모'];
                } else if (currentRecordType === 'bag') {
                    headers = ['날짜', '농가명', '품목', '봉지수', '위치', '메모'];
                }
                
                worksheet.addRow(headers);
                
                // 사용자 정보 가져오기
                const usersResponse = await fetch('/api/users');
                const usersData = await usersResponse.json();
                const users = usersData.users || [];
                const userMap = new Map(users.map(u => [u.id, u]));
                
                // 데이터 추가
                records.forEach(record => {
                    const user = userMap.get(record.user_id);
                    const userName = user ? (user.farm_name || user.username) : '알 수 없음';
                    const cropName = user ? (user.crop_name || '') : '';
                    
                    let row = [];
                    if (currentRecordType === 'daily') {
                        row = [record.date, userName, record.weather || '', record.temperature || '', record.work_content || '', record.memo || ''];
                    } else if (currentRecordType === 'pesticide') {
                        row = [record.date, userName, cropName, record.pesticide_name || '', record.application_area || 0, record.dilution_ratio || '', record.weather || '', record.safe_harvest_date || '', record.phi_days || 0];
                    } else if (currentRecordType === 'irrigation') {
                        row = [record.date, userName, cropName, record.amount || 0, record.method || '', record.memo || ''];
                    } else if (currentRecordType === 'harvest') {
                        row = [record.date, userName, cropName, record.quantity || 0, record.unit || '', record.destination || '', record.memo || ''];
                    } else if (currentRecordType === 'bag') {
                        row = [record.date, userName, cropName, record.bag_count || 0, record.location || '', record.memo || ''];
                    }
                    worksheet.addRow(row);
                });
                
                // 파일 다운로드
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = currentRecordType + '_records_' + new Date().toISOString().split('T')[0] + '.xlsx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert('Excel 파일이 다운로드되었습니다.');
            } catch (error) {
                console.error('Excel 다운로드 오류:', error);
                alert('Excel 다운로드 중 오류가 발생했습니다.');
            }
        });

        document.getElementById('downloadPDF')?.addEventListener('click', async function() {
            if (!currentRecordType) {
                alert('기록 타입을 먼저 선택하세요.');
                return;
            }
            
            try {
                const endpoint = '/api/' + currentRecordType + '-records';
                const response = await fetch(endpoint);
                const data = await response.json();
                const records = data.records || [];
                
                if (records.length === 0) {
                    alert('다운로드할 기록이 없습니다.');
                    return;
                }
                
                // jsPDF를 사용하여 PDF 파일 생성
                // Skypack CDN에서 로드된 jsPDF 사용
                const jsPDFModule = await import('https://cdn.skypack.dev/jspdf@2.5.1');
                const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default?.jsPDF || jsPDFModule;
                const doc = new jsPDF();
                let y = 20;
                
                // 제목
                doc.setFontSize(16);
                const typeNames = {
                    'daily': '영농일지',
                    'pesticide': '방제 기록',
                    'irrigation': '관수 기록',
                    'harvest': '수확 기록',
                    'bag': '봉지 재배'
                };
                doc.text(typeNames[currentRecordType] || '기록', 20, y);
                y += 10;
                
                // 사용자 정보 가져오기
                const usersResponse = await fetch('/api/users');
                const usersData = await usersResponse.json();
                const users = usersData.users || [];
                const userMap = new Map(users.map(u => [u.id, u]));
                
                // 데이터 추가
                doc.setFontSize(10);
                records.forEach((record, index) => {
                    if (y > 280) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    const user = userMap.get(record.user_id);
                    const userName = user ? (user.farm_name || user.username) : '알 수 없음';
                    
                    doc.text(\`[\${index + 1}] 날짜: \${record.date || '-'}, 농가: \${userName}\`, 20, y);
                    y += 7;
                    
                    if (currentRecordType === 'daily') {
                        doc.text(\`   작업내용: \${record.work_content || '-'}, 날씨: \${record.weather || '-'}\`, 20, y);
                    } else if (currentRecordType === 'pesticide') {
                        doc.text(\`   농약명: \${record.pesticide_name || '-'}, 면적: \${record.application_area || 0}㎡\`, 20, y);
                    } else if (currentRecordType === 'irrigation') {
                        doc.text(\`   수량: \${record.amount || 0}, 방법: \${record.method || '-'}\`, 20, y);
                    } else if (currentRecordType === 'harvest') {
                        doc.text(\`   수량: \${record.quantity || 0}\${record.unit || ''}, 목적지: \${record.destination || '-'}\`, 20, y);
                    } else if (currentRecordType === 'bag') {
                        doc.text(\`   봉지수: \${record.bag_count || 0}, 위치: \${record.location || '-'}\`, 20, y);
                    }
                    y += 7;
                });
                
                // 파일 다운로드
                doc.save(currentRecordType + '_records_' + new Date().toISOString().split('T')[0] + '.pdf');
                
                alert('PDF 파일이 다운로드되었습니다.');
            } catch (error) {
                console.error('PDF 다운로드 오류:', error);
                alert('PDF 다운로드 중 오류가 발생했습니다.');
            }
        });

        // 초기 데이터 로드
        loadStats();
        loadAdmins();
        loadFarmers();
    </script>
</body>
</html>
  `;
}
