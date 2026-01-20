// 관리자 상세 페이지 템플릿

export function getFarmersListPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>농가 목록 - 관리자</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <div class="flex items-center gap-4">
                    <a href="/admin" class="text-sm text-gray-600 hover:text-green-600 transition">← 뒤로</a>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">농가 목록</h1>
                </div>
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
        <div class="bg-white rounded-lg shadow p-4 sm:p-6">
            <div id="farmersList" class="space-y-4">
                <p class="text-center text-gray-500 py-8">로딩 중...</p>
            </div>
        </div>
    </main>

    <script>
        async function loadFarmers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                const farmers = (data.users || []).filter(u => u.role === 'farmer');
                
                const listEl = document.getElementById('farmersList');
                if (farmers.length === 0) {
                    listEl.innerHTML = '<p class="text-center text-gray-500 py-8">등록된 농가가 없습니다.</p>';
                    return;
                }
                
                listEl.innerHTML = farmers.map(farmer => \`
                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <h3 class="font-semibold text-lg text-gray-800">\${farmer.farmName || farmer.username}</h3>
                                <p class="text-sm text-gray-600">사용자명: \${farmer.username}</p>
                                <p class="text-sm text-gray-600">품목: \${farmer.cropName || '미지정'}</p>
                                \${farmer.phone ? '<p class="text-sm text-gray-600">연락처: ' + farmer.phone + '</p>' : ''}
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-gray-500">가입일: \${new Date(farmer.createdAt).toLocaleDateString('ko-KR')}</p>
                            </div>
                        </div>
                    </div>
                \`).join('');
            } catch (error) {
                console.error('농가 목록 로드 오류:', error);
                document.getElementById('farmersList').innerHTML = '<p class="text-center text-red-500 py-8">로드 실패</p>';
            }
        }
        
        // 권한 확인
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        } else {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                alert('관리자만 접근할 수 있습니다.');
                window.location.href = '/';
            } else {
                loadFarmers();
            }
        }
    </script>
</body>
</html>
  `;
}

export function getRecordsListPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전체 기록 - 관리자</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <div class="flex items-center gap-4">
                    <a href="/admin" class="text-sm text-gray-600 hover:text-green-600 transition">← 뒤로</a>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">전체 기록</h1>
                </div>
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
        <div class="bg-white rounded-lg shadow p-4 sm:p-6">
            <div class="mb-4">
                <select id="recordType" class="border border-gray-300 rounded-lg px-4 py-2">
                    <option value="daily">영농일지</option>
                    <option value="pesticide">방제 기록</option>
                    <option value="irrigation">관수 기록</option>
                    <option value="harvest">수확 기록</option>
                    <option value="bag">봉지 재배</option>
                </select>
            </div>
            <div id="recordsList" class="space-y-4">
                <p class="text-center text-gray-500 py-8">로딩 중...</p>
            </div>
        </div>
    </main>

    <script>
        let currentType = 'daily';
        
        async function loadRecords(type) {
            try {
                const endpoints = {
                    daily: '/api/daily-records',
                    pesticide: '/api/pesticide-records',
                    irrigation: '/api/irrigation-records',
                    harvest: '/api/harvest-records',
                    bag: '/api/bag-records'
                };
                
                const response = await fetch(endpoints[type]);
                const data = await response.json();
                const records = data.records || [];
                
                const listEl = document.getElementById('recordsList');
                if (records.length === 0) {
                    listEl.innerHTML = '<p class="text-center text-gray-500 py-8">기록이 없습니다.</p>';
                    return;
                }
                
                // 사용자 정보 가져오기
                const usersRes = await fetch('/api/users');
                const usersData = await usersRes.json();
                const users = usersData.users || [];
                const userMap = {};
                users.forEach(u => userMap[u.id] = u);
                
                listEl.innerHTML = records.map(record => {
                    const user = userMap[record.user_id];
                    const userName = user ? (user.farmName || user.username) : '알 수 없음';
                    
                    if (type === 'daily') {
                        return \`
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex items-center justify-between flex-wrap gap-2">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">\${userName}</h3>
                                        <p class="text-sm text-gray-600">날짜: \${record.date || '-'}</p>
                                        <p class="text-sm text-gray-600">날씨: \${record.weather || '-'}</p>
                                        <p class="text-sm text-gray-600">작업내용: \${record.work_content || '-'}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-xs text-gray-500">ID: \${record.id}</p>
                                    </div>
                                </div>
                            </div>
                        \`;
                    } else if (type === 'pesticide') {
                        return \`
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex items-center justify-between flex-wrap gap-2">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">\${userName}</h3>
                                        <p class="text-sm text-gray-600">날짜: \${record.date || '-'}</p>
                                        <p class="text-sm text-gray-600">농약명: \${record.pesticide_name || '-'}</p>
                                        <p class="text-sm text-gray-600">품목: \${record.crop_name || '-'}</p>
                                        <p class="text-sm text-gray-600">안전수확일: \${record.safe_harvest_date || '-'}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-xs text-gray-500">ID: \${record.id}</p>
                                    </div>
                                </div>
                            </div>
                        \`;
                    } else {
                        return \`
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex items-center justify-between flex-wrap gap-2">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">\${userName}</h3>
                                        <p class="text-sm text-gray-600">날짜: \${record.date || '-'}</p>
                                        <p class="text-sm text-gray-600">품목: \${record.crop_name || '-'}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-xs text-gray-500">ID: \${record.id}</p>
                                    </div>
                                </div>
                            </div>
                        \`;
                    }
                }).join('');
            } catch (error) {
                console.error('기록 로드 오류:', error);
                document.getElementById('recordsList').innerHTML = '<p class="text-center text-red-500 py-8">로드 실패</p>';
            }
        }
        
        document.getElementById('recordType').addEventListener('change', (e) => {
            currentType = e.target.value;
            loadRecords(currentType);
        });
        
        // 권한 확인
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        } else {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                alert('관리자만 접근할 수 있습니다.');
                window.location.href = '/';
            } else {
                loadRecords(currentType);
            }
        }
    </script>
</body>
</html>
  `;
}

export function getTodayRecordsPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오늘 기록 - 관리자</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <div class="flex items-center gap-4">
                    <a href="/admin" class="text-sm text-gray-600 hover:text-green-600 transition">← 뒤로</a>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">오늘 기록</h1>
                </div>
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
        <div class="bg-white rounded-lg shadow p-4 sm:p-6">
            <div id="todayRecordsList" class="space-y-4">
                <p class="text-center text-gray-500 py-8">로딩 중...</p>
            </div>
        </div>
    </main>

    <script>
        async function loadTodayRecords() {
            try {
                const today = new Date().toISOString().split('T')[0];
                const endpoints = ['daily', 'pesticide', 'irrigation', 'harvest', 'bag'];
                const allRecords = [];
                
                for (const type of endpoints) {
                    const endpoint = '/api/' + type + '-records';
                    const response = await fetch(endpoint);
                    const data = await response.json();
                    const records = (data.records || []).filter(r => r.date === today);
                    allRecords.push(...records.map(r => ({ ...r, type })));
                }
                
                const listEl = document.getElementById('todayRecordsList');
                if (allRecords.length === 0) {
                    listEl.innerHTML = '<p class="text-center text-gray-500 py-8">오늘 기록이 없습니다.</p>';
                    return;
                }
                
                // 사용자 정보 가져오기
                const usersRes = await fetch('/api/users');
                const usersData = await usersRes.json();
                const users = usersData.users || [];
                const userMap = {};
                users.forEach(u => userMap[u.id] = u);
                
                const typeNames = {
                    daily: '영농일지',
                    pesticide: '방제 기록',
                    irrigation: '관수 기록',
                    harvest: '수확 기록',
                    bag: '봉지 재배'
                };
                
                listEl.innerHTML = allRecords.map(record => {
                    const user = userMap[record.user_id];
                    const userName = user ? (user.farmName || user.username) : '알 수 없음';
                    
                    return \`
                        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            <div class="flex items-center justify-between flex-wrap gap-2">
                                <div>
                                    <span class="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded mb-2">\${typeNames[record.type]}</span>
                                    <h3 class="font-semibold text-gray-800">\${userName}</h3>
                                    <p class="text-sm text-gray-600">날짜: \${record.date || '-'}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-500">ID: \${record.id}</p>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');
            } catch (error) {
                console.error('오늘 기록 로드 오류:', error);
                document.getElementById('todayRecordsList').innerHTML = '<p class="text-center text-red-500 py-8">로드 실패</p>';
            }
        }
        
        // 권한 확인
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        } else {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                alert('관리자만 접근할 수 있습니다.');
                window.location.href = '/';
            } else {
                loadTodayRecords();
            }
        }
    </script>
</body>
</html>
  `;
}

export function getUsersListPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>사용자 목록 - 관리자</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <div class="flex items-center gap-4">
                    <a href="/admin" class="text-sm text-gray-600 hover:text-green-600 transition">← 뒤로</a>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">사용자 목록</h1>
                </div>
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
        <div class="bg-white rounded-lg shadow p-4 sm:p-6">
            <div class="mb-4">
                <select id="userRole" class="border border-gray-300 rounded-lg px-4 py-2">
                    <option value="all">전체</option>
                    <option value="farmer">농가</option>
                    <option value="admin">관리자</option>
                </select>
            </div>
            <div id="usersList" class="space-y-4">
                <p class="text-center text-gray-500 py-8">로딩 중...</p>
            </div>
        </div>
    </main>

    <script>
        async function loadUsers(role = 'all') {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                let users = data.users || [];
                
                if (role !== 'all') {
                    users = users.filter(u => u.role === role);
                }
                
                const listEl = document.getElementById('usersList');
                if (users.length === 0) {
                    listEl.innerHTML = '<p class="text-center text-gray-500 py-8">등록된 사용자가 없습니다.</p>';
                    return;
                }
                
                listEl.innerHTML = users.map(user => \`
                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <h3 class="font-semibold text-lg text-gray-800">\${user.farmName || user.username}</h3>
                                    <span class="px-2 py-1 text-xs rounded \${user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}">\${user.role === 'admin' ? '관리자' : '농가'}</span>
                                </div>
                                <p class="text-sm text-gray-600">사용자명: \${user.username}</p>
                                \${user.role === 'farmer' ? '<p class="text-sm text-gray-600">품목: ' + (user.cropName || '미지정') + '</p>' : ''}
                                \${user.phone ? '<p class="text-sm text-gray-600">연락처: ' + user.phone + '</p>' : ''}
                                \${user.role === 'admin' && user.canAccessFarmerPages ? '<p class="text-sm text-green-600">✓ 농가 페이지 접근 권한 있음</p>' : ''}
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-gray-500">가입일: \${new Date(user.createdAt).toLocaleDateString('ko-KR')}</p>
                            </div>
                        </div>
                    </div>
                \`).join('');
            } catch (error) {
                console.error('사용자 목록 로드 오류:', error);
                document.getElementById('usersList').innerHTML = '<p class="text-center text-red-500 py-8">로드 실패</p>';
            }
        }
        
        document.getElementById('userRole').addEventListener('change', (e) => {
            loadUsers(e.target.value);
        });
        
        // 권한 확인
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        } else {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                alert('관리자만 접근할 수 있습니다.');
                window.location.href = '/';
            } else {
                loadUsers('all');
            }
        }
    </script>
</body>
</html>
  `;
}
