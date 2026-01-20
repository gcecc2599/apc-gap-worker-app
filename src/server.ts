// 로컬 개발 서버 (Node.js)
import { serve } from '@hono/node-server';
import app from './index';

// 프로덕션 환경에서는 PORT 환경 변수 사용, 개발 환경에서는 8787
const port = process.env.PORT ? parseInt(process.env.PORT) : 8787;

// Smithery API Key 확인 (환경 변수로 설정 가능)
const smitheryApiKey = process.env.SMITHERY_API_KEY;
if (smitheryApiKey) {
  console.log('✅ Smithery API Key 설정됨');
}

console.log(`🚀 서버 시작 중...`);
console.log(`📍 접속 주소: http://localhost:${port}`);
console.log(`   - 메인: http://localhost:${port}/`);
console.log(`   - 농가: http://localhost:${port}/farmer`);
console.log(`   - 관리자: http://localhost:${port}/admin`);
console.log(`   - API: http://localhost:${port}/api`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`✅ 서버 실행 중: http://localhost:${info.port}`);
  console.log(`\n브라우저에서 위 주소로 접속하세요.\n`);
});
