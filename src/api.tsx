// API 엔드포인트 (30+ 개)
import { Hono } from 'hono';
import type { User, DailyRecord, PesticideRecord, IrrigationRecord, HarvestRecord, BagRecord } from './types';
import { loggingService, metricService } from './services/monitoring';
import { cacheService } from './services/cache';
import { authService } from './services/auth';
import { storageService } from './services/storage';

const api = new Hono();

// 요청 시간 추적 미들웨어
api.use('*', async (c, next) => {
  const startTime = Date.now();
  const endpoint = c.req.path;
  
  try {
    await next();
    
    const duration = Date.now() - startTime;
    metricService.recordResponseTime(endpoint, duration, c.res.status);
    
    if (c.res.status >= 400) {
      loggingService.warn(`API 요청 실패: ${endpoint}`, {
        status: c.res.status,
        duration,
      });
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    metricService.recordResponseTime(endpoint, duration, 500);
    loggingService.error(`API 오류: ${endpoint}`, error, { duration });
    throw error;
  }
});

// 인증 관련 API
api.post('/auth/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    if (!username || !password) {
      return c.json({ success: false, message: '사용자명과 비밀번호를 입력하세요.' }, 400);
    }

    // 실제 인증 로직
    const result = await authService.authenticate(username, password);
    
    if (result.success && result.user && result.token) {
      return c.json({ 
        success: true, 
        user: result.user,
        token: result.token 
      });
    }
    
    return c.json({ success: false, message: '사용자명 또는 비밀번호가 올바르지 않습니다.' }, 401);
  } catch (error) {
    loggingService.error('로그인 오류', error);
    return c.json({ success: false, message: '로그인 중 오류가 발생했습니다.' }, 500);
  }
});

api.get('/users/:id', async (c) => {
  const id = c.req.param('id');
  // 사용자 조회 (이름으로)
  const user = authService.getUser(id);
  if (user) {
    return c.json(user);
  }
  return c.json({ error: '사용자를 찾을 수 없습니다.' }, 404);
});

// 영농일지 API
api.get('/daily-records', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const records = storageService.getDailyRecords(userId ? parseInt(userId) : undefined);
    return c.json({ records });
  } catch (error) {
    loggingService.error('영농일지 조회 오류', error);
    return c.json({ records: [] });
  }
});

api.post('/daily-records', async (c) => {
  try {
    const data = await c.req.json() as Partial<DailyRecord>;
    const record = storageService.createDailyRecord(data);
    loggingService.info('영농일지 생성', { id: record.id, user_id: record.user_id });
    return c.json({ success: true, id: record.id, record }, 201);
  } catch (error) {
    loggingService.error('영농일지 저장 오류', error);
    return c.json({ success: false, message: '저장 실패' }, 500);
  }
});

api.put('/daily-records/:id', async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  // TODO: D1 DB에서 영농일지 수정
  return c.json({ success: true, id });
});

api.delete('/daily-records/:id', async (c) => {
  const id = c.req.param('id');
  // TODO: D1 DB에서 영농일지 삭제
  return c.json({ success: true, id });
});

// 방제 기록 API
api.get('/pesticide-records', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const records = storageService.getPesticideRecords(userId ? parseInt(userId) : undefined);
    return c.json({ records });
  } catch (error) {
    loggingService.error('방제 기록 조회 오류', error);
    return c.json({ records: [] });
  }
});

api.post('/pesticide-records', async (c) => {
  try {
    const data = await c.req.json() as Partial<PesticideRecord>;
    // 안전수확일 계산
    if (data.date && data.phi_days) {
      const date = new Date(data.date);
      date.setDate(date.getDate() + data.phi_days);
      data.safe_harvest_date = date.toISOString().split('T')[0];
    }
    const record = storageService.createPesticideRecord(data);
    loggingService.info('방제 기록 생성', { id: record.id, user_id: record.user_id });
    return c.json({ success: true, id: record.id, record }, 201);
  } catch (error) {
    loggingService.error('방제 기록 저장 오류', error);
    return c.json({ success: false, message: '저장 실패' }, 500);
  }
});

api.put('/pesticide-records/:id', async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  // TODO: D1 DB에서 방제 기록 수정
  return c.json({ success: true, id });
});

api.delete('/pesticide-records/:id', async (c) => {
  const id = c.req.param('id');
  // TODO: D1 DB에서 방제 기록 삭제
  return c.json({ success: true, id });
});

// 관수 기록 API
api.get('/irrigation-records', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const records = storageService.getIrrigationRecords(userId ? parseInt(userId) : undefined);
    return c.json({ records });
  } catch (error) {
    loggingService.error('관수 기록 조회 오류', error);
    return c.json({ records: [] });
  }
});

api.post('/irrigation-records', async (c) => {
  try {
    const data = await c.req.json() as Partial<IrrigationRecord>;
    const record = storageService.createIrrigationRecord(data);
    loggingService.info('관수 기록 생성', { id: record.id, user_id: record.user_id });
    return c.json({ success: true, id: record.id, record }, 201);
  } catch (error) {
    loggingService.error('관수 기록 저장 오류', error);
    return c.json({ success: false, message: '저장 실패' }, 500);
  }
});

api.put('/irrigation-records/:id', async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  return c.json({ success: true, id });
});

api.delete('/irrigation-records/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({ success: true, id });
});

// 수확 기록 API
api.get('/harvest-records', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const records = storageService.getHarvestRecords(userId ? parseInt(userId) : undefined);
    return c.json({ records });
  } catch (error) {
    loggingService.error('수확 기록 조회 오류', error);
    return c.json({ records: [] });
  }
});

api.post('/harvest-records', async (c) => {
  try {
    const data = await c.req.json() as Partial<HarvestRecord>;
    const record = storageService.createHarvestRecord(data);
    loggingService.info('수확 기록 생성', { id: record.id, user_id: record.user_id });
    return c.json({ success: true, id: record.id, record }, 201);
  } catch (error) {
    loggingService.error('수확 기록 저장 오류', error);
    return c.json({ success: false, message: '저장 실패' }, 500);
  }
});

api.put('/harvest-records/:id', async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  return c.json({ success: true, id });
});

api.delete('/harvest-records/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({ success: true, id });
});

// 봉지 재배 API
api.get('/bag-records', async (c) => {
  try {
    const userId = c.req.query('user_id');
    const records = storageService.getBagRecords(userId ? parseInt(userId) : undefined);
    return c.json({ records });
  } catch (error) {
    loggingService.error('봉지 재배 기록 조회 오류', error);
    return c.json({ records: [] });
  }
});

api.post('/bag-records', async (c) => {
  try {
    const data = await c.req.json() as Partial<BagRecord>;
    const record = storageService.createBagRecord(data);
    loggingService.info('봉지 재배 기록 생성', { id: record.id, user_id: record.user_id });
    return c.json({ success: true, id: record.id, record }, 201);
  } catch (error) {
    loggingService.error('봉지 재배 기록 저장 오류', error);
    return c.json({ success: false, message: '저장 실패' }, 500);
  }
});

api.put('/bag-records/:id', async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  return c.json({ success: true, id });
});

api.delete('/bag-records/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({ success: true, id });
});

// 관리자 API
api.get('/admin/dashboard/stats', async (c) => {
  try {
    const allUsers = authService.getAllUsers();
    const farmers = allUsers.filter(u => u.role === 'farmer');
    const totalRecords = storageService.getTotalRecords();
    const todayRecords = storageService.getTodayRecords();
    
    return c.json({ 
      total_farmers: farmers.length, 
      total_records: totalRecords,
      today_records: todayRecords,
      active_users: allUsers.length,
      recent_activities: [] 
    });
  } catch (error) {
    loggingService.error('통계 조회 오류', error);
    return c.json({ 
      total_farmers: 0, 
      total_records: 0,
      today_records: 0,
      active_users: 0,
      recent_activities: [] 
    });
  }
});

api.get('/users', async (c) => {
  // 메모리 기반 사용자 목록 조회
  const allUsers = authService.getAllUsers();
  return c.json({ users: allUsers });
});

api.post('/users', async (c) => {
  try {
    const data = await c.req.json();
    const { username, password, role, farm_name, phone, crop_id, crop_name } = data;
    
    if (!username || !password || !role) {
      return c.json({ success: false, message: '사용자명, 비밀번호, 역할은 필수입니다.' }, 400);
    }

    // 역할에 따라 사용자 생성
    if (role === 'farmer') {
      if (!crop_id) {
        return c.json({ success: false, message: '농가는 품목을 선택해야 합니다.' }, 400);
      }
      // farm_name을 farmName으로 변환 (API는 스네이크 케이스, 서비스는 카멜 케이스)
      authService.createFarmerUser(username, password, farm_name || username, phone, parseInt(crop_id), crop_name);
    } else if (role === 'admin') {
      // 관리자 계정 생성 (현재는 직접 생성)
      authService.createAdminUser(username, password);
    }
    
    return c.json({ success: true, id: Date.now() }, 201);
  } catch (error) {
    loggingService.error('사용자 생성 오류', error);
    return c.json({ success: false, message: '사용자 생성에 실패했습니다.' }, 500);
  }
});

api.put('/users/:id', async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  return c.json({ success: true, id });
});

api.delete('/users/:id', async (c) => {
  const id = c.req.param('id'); // username으로 사용
  const deleted = authService.deleteUser(id);
  if (deleted) {
    return c.json({ success: true, id });
  }
  return c.json({ success: false, message: '사용자를 찾을 수 없습니다.' }, 404);
});

// 참조 데이터 API
api.get('/pesticide-standards', async (c) => {
  return c.json({ standards: [] });
});

api.get('/crops', async (c) => {
  return c.json({ crops: [] });
});

// 입고 예약 API
api.get('/delivery-reservations', async (c) => {
  try {
    const farmerUsername = c.req.query('farmer_username');
    const status = c.req.query('status');
    
    const reservations = storageService.getDeliveryReservations(
      farmerUsername || undefined,
      status || undefined
    );
    
    return c.json({ reservations });
  } catch (error) {
    loggingService.error('입고 예약 목록 조회 오류', error);
    return c.json({ reservations: [] });
  }
});

api.post('/delivery-reservations', async (c) => {
  try {
    const data = await c.req.json();
    // API 필드명과 프론트엔드 필드명 매핑
    const reservation_date = data.reservation_date || data.delivery_date;
    const expected_quantity_container = data.expected_quantity_container || data.container_quantity;
    const farmer_name = data.farmer_name || data.name;
    const contact_phone = data.contact_phone || data.contact;
    const affiliation = data.affiliation;
    const notes = data.notes;
    const farmer_username = data.farmer_username;
    const farmer_id = data.farmer_id;
    
    if (!reservation_date || !expected_quantity_container || !farmer_name || !contact_phone || !affiliation) {
      return c.json({ success: false, message: '입고 예약날짜, 입고 예정 수량(컨테이너), 성함, 연락처, 소속은 필수입니다.' }, 400);
    }
    
    const reservation = storageService.createDeliveryReservation({
      farmer_username: farmer_username || farmer_name,
      farmer_id: farmer_id,
      farmer_name,
      contact_phone,
      affiliation,
      reservation_date,
      expected_quantity_container: parseInt(expected_quantity_container),
      notes,
      status: 'pending',
    });
    
    loggingService.info('APC 입고 예약 생성', { id: reservation.id, farmer_username, farmer_id, reservation_date });
    
    return c.json({ success: true, reservation }, 201);
  } catch (error) {
    loggingService.error('입고 예약 생성 오류', error);
    return c.json({ success: false, message: '예약 생성에 실패했습니다.' }, 500);
  }
});

api.put('/delivery-reservations/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const { status } = await c.req.json();
    
    if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return c.json({ success: false, message: '유효하지 않은 상태입니다.' }, 400);
    }
    
    const reservation = storageService.updateDeliveryReservation(id, status);
    if (reservation) {
      return c.json({ success: true, id, status, reservation });
    }
    return c.json({ success: false, message: '예약을 찾을 수 없습니다.' }, 404);
  } catch (error) {
    loggingService.error('입고 예약 상태 업데이트 오류', error);
    return c.json({ success: false, message: '상태 변경에 실패했습니다.' }, 500);
  }
});

// SMS API
api.post('/sms/send', async (c) => {
  try {
    const { to, message } = await c.req.json();
    // TODO: Twilio SMS 전송
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, message: '전송 실패' }, 500);
  }
});

api.post('/sms/schedule', async (c) => {
  try {
    const data = await c.req.json();
    // TODO: SMS 스케줄링
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, message: '스케줄링 실패' }, 500);
  }
});

// CORS 미들웨어
api.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204);
  }
  
  await next();
});

export default api;
