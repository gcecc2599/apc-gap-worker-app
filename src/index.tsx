import { Hono } from 'hono';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import api from './api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { getFarmerDashboard } from './farmer';
import { getAdminDashboard } from './admin';
import { getFarmersListPage, getRecordsListPage, getTodayRecordsPage, getUsersListPage } from './admin-details';
import { authService } from './services/auth';

const app = new Hono();

// 인증 미들웨어 헬퍼 함수 (서버 사이드에서는 HTML만 반환, 클라이언트에서 권한 확인)
// 실제 인증은 클라이언트 사이드에서 localStorage를 통해 확인

// 정적 파일 서빙 (public 폴더)
// 프로덕션 환경에서도 경로가 제대로 작동하도록 process.cwd() 사용
const getPublicPath = (relativePath: string) => {
  // 개발 환경: __dirname 사용, 프로덕션: process.cwd() 사용
  const basePath = __dirname.includes('node_modules') || process.env.NODE_ENV === 'production' 
    ? process.cwd() 
    : __dirname.replace(/\/src$|\\src$/, '');
  return join(basePath, 'public', relativePath);
};

app.get('/manifest.json', (c) => {
  try {
    const file = readFileSync(getPublicPath('manifest.json'), 'utf-8');
    return c.json(JSON.parse(file));
  } catch (error) {
    console.error('manifest.json 읽기 오류:', error);
    return c.text('{}', 404);
  }
});

app.get('/icon-192.png', async (c) => {
  try {
    const file = readFileSync(getPublicPath('icon-192.png'));
    return c.body(file, 200, { 'Content-Type': 'image/png' });
  } catch (error) {
    console.error('icon-192.png 읽기 오류:', error);
    return c.text('Not found', 404);
  }
});

app.get('/icon-512.png', async (c) => {
  try {
    const file = readFileSync(getPublicPath('icon-512.png'));
    return c.body(file, 200, { 'Content-Type': 'image/png' });
  } catch (error) {
    console.error('icon-512.png 읽기 오류:', error);
    return c.text('Not found', 404);
  }
});

app.get('/static/*', async (c) => {
  const path = c.req.param('*') || '';
  try {
    const filePath = getPublicPath(join('static', path));
    const file = readFileSync(filePath, 'utf-8');
    const ext = path.split('.').pop() || '';
    const contentType = ext === 'js' ? 'application/javascript' : 'text/plain';
    return c.body(file, 200, { 'Content-Type': contentType });
  } catch (error) {
    console.error(`static/${path} 읽기 오류:`, error);
    return c.text('Not found', 404);
  }
});

// API 라우트 마운트
app.route('/api', api);

// 랜딩 페이지 (메인 로그인 페이지)
function getMainPage() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="서북부경남거점APC GAP 기록관리 - 농가의 모든 기록을 한 곳에서 관리">
    <meta name="theme-color" content="#16a34a">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="APC GAP 기록관리">
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
    <link rel="apple-touch-icon" href="/icon-192.png">
    <title>서북부경남거점APC GAP 기록관리</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
    </style>
</head>
<body>
    <div class="w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4 sm:p-6 md:p-8">
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8">
            <!-- 로고 영역 -->
            <div class="text-center mb-6 sm:mb-8">
                <div class="inline-block p-3 sm:p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-3 sm:mb-4">
                    <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">서북부경남거점APC GAP 기록관리</h1>
                <p class="text-gray-600 text-xs sm:text-sm md:text-base">농가의 모든 기록을 한 곳에서 관리하세요</p>
            </div>

            <!-- 로그인 폼 -->
            <form id="loginForm" class="space-y-4 sm:space-y-6">
                <div>
                    <label for="username" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        사용자명
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        required
                        class="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="사용자명을 입력하세요"
                    />
                </div>

                <div>
                    <label for="password" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        비밀번호
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        required
                        class="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <button 
                    type="submit"
                    class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
                >
                    로그인
                </button>
            </form>

            <!-- 추가 링크 -->
            <div class="mt-4 sm:mt-6 text-center space-y-1.5 sm:space-y-2">
                <a href="/farmer" class="block text-xs sm:text-sm text-gray-600 hover:text-green-600 transition">
                    농가 테스트 →
                </a>
                <a href="/admin" class="block text-xs sm:text-sm text-gray-600 hover:text-green-600 transition">
                    관리자 테스트 →
                </a>
            </div>

            <!-- 기능 소개 -->
            <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <h3 class="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">주요 기능</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                    <div class="flex items-center">
                        <span class="text-green-500 mr-1.5">•</span>
                        <span>영농일지</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-green-500 mr-1.5">•</span>
                        <span>방제 기록</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-green-500 mr-1.5">•</span>
                        <span>관수 기록</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-green-500 mr-1.5">•</span>
                        <span>수확 기록</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-green-500 mr-1.5">•</span>
                        <span>봉지 재배</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-green-500 mr-1.5">•</span>
                        <span>리포트 생성</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 푸터 -->
        <div class="text-center mt-4 sm:mt-6 text-white text-xs sm:text-sm">
            <p>© 2026 APC. All rights reserved.</p>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // 토큰 저장
                    if (result.token) {
                        localStorage.setItem('auth_token', result.token);
                        localStorage.setItem('user', JSON.stringify(result.user));
                    }
                    
                    // 역할에 따라 리다이렉트
                    if (result.user.role === 'admin') {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/farmer';
                    }
                } else {
                    alert(result.message || '로그인 실패. 사용자명과 비밀번호를 확인하세요.');
                }
            } catch (error) {
                console.error('로그인 오류:', error);
                alert('로그인 중 오류가 발생했습니다.');
            }
        });
    </script>
</body>
</html>
  `;
}

// 루트 경로 - 랜딩 페이지
app.get('/', (c) => {
  return c.html(getMainPage());
});

// 농가 대시보드 - 클라이언트 사이드에서 권한 확인
app.get('/farmer', (c) => {
  return c.html(getFarmerDashboard());
});

// 관리자 대시보드 - 클라이언트 사이드에서 권한 확인
app.get('/admin', (c) => {
  try {
    const html = getAdminDashboard();
    return c.html(html);
  } catch (error) {
    console.error('관리자 대시보드 생성 오류:', error);
    return c.html(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>오류</title>
      </head>
      <body>
        <h1>오류가 발생했습니다</h1>
        <p>관리자 대시보드를 불러올 수 없습니다.</p>
        <a href="/">메인으로 돌아가기</a>
        <script>
          console.error('관리자 대시보드 오류:', ${JSON.stringify(error instanceof Error ? error.message : String(error))});
        </script>
      </body>
      </html>
    `, 500);
  }
});

// 관리자 상세 페이지들
app.get('/admin/farmers', (c) => {
  return c.html(getFarmersListPage());
});

app.get('/admin/records', (c) => {
  return c.html(getRecordsListPage());
});

app.get('/admin/today-records', (c) => {
  return c.html(getTodayRecordsPage());
});

app.get('/admin/users', (c) => {
  return c.html(getUsersListPage());
});

export default app;
