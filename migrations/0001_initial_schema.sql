-- D1 데이터베이스 초기 스키마 (10개 테이블)

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'farmer' CHECK(role IN ('farmer', 'admin')),
  farm_name TEXT,
  phone TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 영농일지 테이블
CREATE TABLE IF NOT EXISTS daily_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  weather TEXT NOT NULL,
  temperature REAL,
  work_content TEXT NOT NULL,
  memo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_daily_records_user_id ON daily_records(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_records_date ON daily_records(date);

-- 방제 기록 테이블
CREATE TABLE IF NOT EXISTS pesticide_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  crop_id INTEGER NOT NULL,
  pesticide_name TEXT NOT NULL,
  application_area REAL NOT NULL,
  dilution_ratio TEXT,
  weather TEXT NOT NULL,
  phi_days INTEGER NOT NULL, -- 안전수확일 (일)
  safe_harvest_date TEXT NOT NULL, -- 계산된 안전수확일
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pesticide_records_user_id ON pesticide_records(user_id);
CREATE INDEX IF NOT EXISTS idx_pesticide_records_date ON pesticide_records(date);
CREATE INDEX IF NOT EXISTS idx_pesticide_records_safe_harvest_date ON pesticide_records(safe_harvest_date);

-- 관수 기록 테이블
CREATE TABLE IF NOT EXISTS irrigation_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  crop_id INTEGER NOT NULL,
  amount REAL NOT NULL, -- 관수량 (L)
  method TEXT NOT NULL, -- 관수 방법 (관수, 스프링클러 등)
  memo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_irrigation_records_user_id ON irrigation_records(user_id);
CREATE INDEX IF NOT EXISTS idx_irrigation_records_date ON irrigation_records(date);

-- 수확 기록 테이블
CREATE TABLE IF NOT EXISTS harvest_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  crop_id INTEGER NOT NULL,
  quantity REAL NOT NULL,
  unit TEXT NOT NULL, -- 단위 (kg, 개, 상자 등)
  destination TEXT, -- 목적지 (국내, 수출 등)
  memo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_harvest_records_user_id ON harvest_records(user_id);
CREATE INDEX IF NOT EXISTS idx_harvest_records_date ON harvest_records(date);

-- 봉지 재배 테이블
CREATE TABLE IF NOT EXISTS bag_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  crop_id INTEGER NOT NULL,
  bag_count INTEGER NOT NULL, -- 봉지 개수
  location TEXT, -- 재배 위치
  memo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_bag_records_user_id ON bag_records(user_id);
CREATE INDEX IF NOT EXISTS idx_bag_records_date ON bag_records(date);

-- 농약 기준 테이블
CREATE TABLE IF NOT EXISTS pesticide_standards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  crop TEXT NOT NULL,
  phi_days INTEGER NOT NULL, -- 안전수확일
  active_ingredient TEXT, -- 유효성분
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pesticide_standards_name ON pesticide_standards(name);
CREATE INDEX IF NOT EXISTS idx_pesticide_standards_crop ON pesticide_standards(crop);

-- 품목 테이블
CREATE TABLE IF NOT EXISTS crops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  code TEXT, -- 품목 코드
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_crops_name ON crops(name);

-- 농가-품목 매핑 테이블
CREATE TABLE IF NOT EXISTS farm_crops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  crop_id INTEGER NOT NULL,
  area REAL, -- 재배 면적 (m²)
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE,
  UNIQUE(user_id, crop_id)
);

CREATE INDEX IF NOT EXISTS idx_farm_crops_user_id ON farm_crops(user_id);
CREATE INDEX IF NOT EXISTS idx_farm_crops_crop_id ON farm_crops(crop_id);

-- 알림 테이블
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- 알림 유형 (sms, push, email 등)
  message TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0 CHECK(read IN (0, 1)), -- 0: 읽지 않음, 1: 읽음
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
