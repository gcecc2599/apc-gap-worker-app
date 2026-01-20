// Node.js 스크립트로 아이콘 생성 (canvas 패키지 필요)
// 사용법: npm install canvas (또는 sharp) 후 node generate-icons.js

const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // 초록색 배경
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, 0, size, size);

  // 흰색 텍스트
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.3}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('APC', size / 2, size / 2 - size * 0.1);
  ctx.font = `bold ${size * 0.2}px Arial`;
  ctx.fillText('GAP', size / 2, size / 2 + size * 0.1);

  // PNG로 저장
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`✓ ${filename} 생성 완료 (${size}x${size})`);
}

try {
  createIcon(192, 'icon-192.png');
  createIcon(512, 'icon-512.png');
  console.log('\n✅ 모든 아이콘 생성 완료!');
} catch (error) {
  console.error('❌ 아이콘 생성 실패:', error.message);
  console.log('\n💡 해결 방법:');
  console.log('   1. npm install canvas 설치 (선택사항)');
  console.log('   2. 또는 온라인 아이콘 생성 도구 사용:');
  console.log('      - https://www.favicon-generator.org/');
  console.log('      - https://realfavicongenerator.net/');
  console.log('   3. 또는 간단한 PNG 이미지를 icon-192.png, icon-512.png로 저장');
}
