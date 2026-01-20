// TypeScript 타입 정의

export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: 'farmer' | 'admin';
  farm_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface DailyRecord {
  id: number;
  user_id: number;
  date: string;
  weather: string;
  temperature?: number;
  work_content: string;
  memo?: string;
  created_at: string;
  updated_at: string;
}

export interface PesticideRecord {
  id: number;
  user_id: number;
  date: string;
  crop_id: number;
  pesticide_name: string;
  application_area: number;
  dilution_ratio?: string;
  weather: string;
  phi_days: number; // 안전수확일
  safe_harvest_date: string; // 계산된 안전수확일
  created_at: string;
  updated_at: string;
}

export interface IrrigationRecord {
  id: number;
  user_id: number;
  date: string;
  crop_id: number;
  amount: number;
  method: string;
  memo?: string;
  created_at: string;
  updated_at: string;
}

export interface HarvestRecord {
  id: number;
  user_id: number;
  date: string;
  crop_id: number;
  quantity: number;
  unit: string;
  destination?: string;
  memo?: string;
  created_at: string;
  updated_at: string;
}

export interface BagRecord {
  id: number;
  user_id: number;
  date: string;
  crop_id: number;
  bag_count: number;
  location?: string;
  memo?: string;
  created_at: string;
  updated_at: string;
}

export interface PesticideStandard {
  id: number;
  name: string;
  crop: string;
  phi_days: number;
  active_ingredient?: string;
  created_at: string;
  updated_at: string;
}

export interface Crop {
  id: number;
  name: string;
  code?: string;
  created_at: string;
  updated_at: string;
}

export interface FarmCrop {
  id: number;
  user_id: number;
  crop_id: number;
  area?: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface DeliveryReservation {
  id: number;
  farmer_username?: string;
  farmer_id?: number;
  farmer_name: string;
  contact_phone: string;
  affiliation: string;
  reservation_date: string;
  expected_quantity_container: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}
