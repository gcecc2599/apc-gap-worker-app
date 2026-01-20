// AI 기반 작업 추천 시스템

/**
 * 계절별 추천 작업 목록
 * @param {number} month - 월 (1-12)
 * @returns {Array<{task: string, priority: 'high'|'medium'|'low'}>} 추천 작업 배열
 */
function getSeasonalRecommendations(month) {
  const recommendations = {
    1: [ // 1월
      { task: '겨울철 시설 점검 및 정비', priority: 'high' },
      { task: '종자 준비 및 발아 테스트', priority: 'medium' },
      { task: '비료 및 농약 재고 확인', priority: 'low' }
    ],
    2: [ // 2월
      { task: '파종 및 육묘 준비', priority: 'high' },
      { task: '비닐하우스 점검 및 보온 관리', priority: 'high' },
      { task: '관수 시스템 점검', priority: 'medium' }
    ],
    3: [ // 3월
      { task: '정식 및 이식 작업', priority: 'high' },
      { task: '초기 생육 관리 (관수, 비료)', priority: 'high' },
      { task: '병해충 예방 약제 준비', priority: 'medium' }
    ],
    4: [ // 4월
      { task: '생육 관리 및 가지치기', priority: 'high' },
      { task: '첫 방제 실시 (예방)', priority: 'high' },
      { task: '관수량 조절 (생육기)', priority: 'medium' }
    ],
    5: [ // 5월
      { task: '병해충 정기 방제', priority: 'high' },
      { task: '비료 시비 (성장기)', priority: 'high' },
      { task: '과다 착과 방지 작업', priority: 'medium' }
    ],
    6: [ // 6월
      { task: '여름철 병해충 집중 관리', priority: 'high' },
      { task: '관수량 증가 (온도 상승)', priority: 'high' },
      { task: '차광 시설 준비', priority: 'medium' }
    ],
    7: [ // 7월
      { task: '고온 스트레스 관리', priority: 'high' },
      { task: '병해충 방제 (다습 환경)', priority: 'high' },
      { task: '수확 준비 (조기 품종)', priority: 'medium' }
    ],
    8: [ // 8월
      { task: '본격적인 수확 시작', priority: 'high' },
      { task: '후기 작물 관리', priority: 'high' },
      { task: '가을 파종 준비', priority: 'low' }
    ],
    9: [ // 9월
      { task: '수확 본격화 및 품질 관리', priority: 'high' },
      { task: '후기 병해충 방제', priority: 'medium' },
      { task: '수확물 보관 및 판매 준비', priority: 'medium' }
    ],
    10: [ // 10월
      { task: '수확 마무리 작업', priority: 'high' },
      { task: '시설 정리 및 청소', priority: 'medium' },
      { task: '다음 시즌 계획 수립', priority: 'low' }
    ],
    11: [ // 11월
      { task: '겨울철 작물 정식', priority: 'high' },
      { task: '비닐하우스 보온 관리', priority: 'high' },
      { task: '시설 점검 및 수리', priority: 'medium' }
    ],
    12: [ // 12월
      { task: '겨울철 시설 관리', priority: 'high' },
      { task: '내년 계획 수립', priority: 'medium' },
      { task: '장비 점검 및 보관', priority: 'low' }
    ]
  };

  return recommendations[month] || [];
}

/**
 * 기록 기반 추천 작업
 * @param {Array} pesticideRecords - 방제 기록 배열
 * @returns {Array<{task: string, priority: string, reason: string}>} 추천 작업 배열
 */
function getRecordBasedRecommendations(pesticideRecords) {
  const recommendations = [];
  const today = new Date();
  
  // 마지막 방제 후 경과일 확인
  if (pesticideRecords && pesticideRecords.length > 0) {
    const lastRecord = pesticideRecords[pesticideRecords.length - 1];
    const lastDate = new Date(lastRecord.date);
    const daysSince = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    
    if (daysSince > 14) {
      recommendations.push({
        task: '정기 방제 실시 (14일 경과)',
        priority: 'high',
        reason: `마지막 방제일로부터 ${daysSince}일이 경과했습니다.`
      });
    }
    
    // PHI (안전수확일) 확인
    if (lastRecord.safe_harvest_date) {
      const safeDate = new Date(lastRecord.safe_harvest_date);
      const daysUntilSafe = Math.floor((safeDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilSafe <= 0) {
        recommendations.push({
          task: `${lastRecord.crop_name || '작물'} 안전수확 가능`,
          priority: 'high',
          reason: '안전수확일이 되었습니다.'
        });
      } else if (daysUntilSafe <= 3) {
        recommendations.push({
          task: `안전수확일까지 ${daysUntilSafe}일 남음`,
          priority: 'medium',
          reason: '곧 수확 가능합니다. 준비하세요.'
        });
      }
    }
  } else {
    recommendations.push({
      task: '초기 방제 실시 권장',
      priority: 'medium',
      reason: '아직 방제 기록이 없습니다.'
    });
  }
  
  return recommendations;
}

/**
 * PHI (안전사용일) 경고 체크
 * @param {Array} pesticideRecords - 방제 기록 배열
 * @returns {Array<{warning: string, priority: 'high'|'medium'|'low'}>} 경고 배열
 */
function checkPHIWarnings(pesticideRecords) {
  const warnings = [];
  const today = new Date();
  
  if (!pesticideRecords || pesticideRecords.length === 0) {
    return warnings;
  }
  
  pesticideRecords.forEach(record => {
    if (record.safe_harvest_date) {
      const safeDate = new Date(record.safe_harvest_date);
      
      // 안전수확일 이전 수확 시도 경고
      if (today < safeDate) {
        const daysUntil = Math.floor((safeDate - today) / (1000 * 60 * 60 * 24));
        warnings.push({
          warning: `${record.pesticide_name} 사용 후 안전수확일까지 ${daysUntil}일 남았습니다.`,
          priority: daysUntil <= 3 ? 'high' : 'medium',
          date: record.date,
          pesticide: record.pesticide_name
        });
      }
    }
  });
  
  return warnings;
}

/**
 * 통합 추천 작업 목록 생성
 * @param {number} month - 현재 월
 * @param {Array} pesticideRecords - 방제 기록
 * @param {Array} dailyRecords - 영농일지 기록
 * @returns {Array} 추천 작업 통합 목록
 */
function getRecommendations(month, pesticideRecords = [], dailyRecords = []) {
  const seasonal = getSeasonalRecommendations(month);
  const recordBased = getRecordBasedRecommendations(pesticideRecords);
  const warnings = checkPHIWarnings(pesticideRecords);
  
  return {
    seasonal,
    recordBased,
    warnings,
    all: [
      ...seasonal.map(r => ({ ...r, type: 'seasonal' })),
      ...recordBased.map(r => ({ ...r, type: 'record' })),
      ...warnings.map(w => ({ task: w.warning, priority: w.priority, type: 'warning' }))
    ]
  };
}

// 전역 함수로 내보내기 (브라우저에서 사용)
if (typeof window !== 'undefined') {
  window.getSeasonalRecommendations = getSeasonalRecommendations;
  window.getRecordBasedRecommendations = getRecordBasedRecommendations;
  window.checkPHIWarnings = checkPHIWarnings;
  window.getRecommendations = getRecommendations;
}

// Node.js 환경에서 사용하는 경우
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getSeasonalRecommendations,
    getRecordBasedRecommendations,
    checkPHIWarnings,
    getRecommendations
  };
}
