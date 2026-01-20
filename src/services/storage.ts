// 메모리 기반 데이터 저장소
// 프로덕션에서는 D1 DB로 교체 필요

import { DailyRecord, PesticideRecord, IrrigationRecord, HarvestRecord, BagRecord, DeliveryReservation } from '../types';

export class StorageService {
  // 각 타입별 저장소
  private dailyRecords: Map<number, DailyRecord> = new Map();
  private pesticideRecords: Map<number, PesticideRecord> = new Map();
  private irrigationRecords: Map<number, IrrigationRecord> = new Map();
  private harvestRecords: Map<number, HarvestRecord> = new Map();
  private bagRecords: Map<number, BagRecord> = new Map();
  private deliveryReservations: Map<number, DeliveryReservation> = new Map();
  
  private nextId = {
    daily: 1,
    pesticide: 1,
    irrigation: 1,
    harvest: 1,
    bag: 1,
    delivery: 1,
  };

  // 영농일지
  createDailyRecord(data: Partial<DailyRecord>): DailyRecord {
    const record: DailyRecord = {
      id: this.nextId.daily++,
      user_id: data.user_id || 0,
      date: data.date || new Date().toISOString().split('T')[0],
      weather: data.weather || '',
      temperature: data.temperature,
      work_content: data.work_content || '',
      memo: data.memo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.dailyRecords.set(record.id, record);
    return record;
  }

  getDailyRecords(userId?: number): DailyRecord[] {
    const records = Array.from(this.dailyRecords.values());
    if (userId) {
      return records.filter(r => r.user_id === userId);
    }
    return records;
  }

  // 방제 기록
  createPesticideRecord(data: Partial<PesticideRecord>): PesticideRecord {
    const record: PesticideRecord = {
      id: this.nextId.pesticide++,
      user_id: data.user_id || 0,
      date: data.date || new Date().toISOString().split('T')[0],
      crop_id: data.crop_id || 0,
      pesticide_name: data.pesticide_name || '',
      application_area: data.application_area || 0,
      dilution_ratio: data.dilution_ratio,
      weather: data.weather || '',
      phi_days: data.phi_days || 0,
      safe_harvest_date: data.safe_harvest_date || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.pesticideRecords.set(record.id, record);
    return record;
  }

  getPesticideRecords(userId?: number): PesticideRecord[] {
    const records = Array.from(this.pesticideRecords.values());
    if (userId) {
      return records.filter(r => r.user_id === userId);
    }
    return records;
  }

  // 관수 기록
  createIrrigationRecord(data: Partial<IrrigationRecord>): IrrigationRecord {
    const record: IrrigationRecord = {
      id: this.nextId.irrigation++,
      user_id: data.user_id || 0,
      date: data.date || new Date().toISOString().split('T')[0],
      crop_id: data.crop_id || 0,
      amount: data.amount || 0,
      method: data.method || '',
      memo: data.memo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.irrigationRecords.set(record.id, record);
    return record;
  }

  getIrrigationRecords(userId?: number): IrrigationRecord[] {
    const records = Array.from(this.irrigationRecords.values());
    if (userId) {
      return records.filter(r => r.user_id === userId);
    }
    return records;
  }

  // 수확 기록
  createHarvestRecord(data: Partial<HarvestRecord>): HarvestRecord {
    const record: HarvestRecord = {
      id: this.nextId.harvest++,
      user_id: data.user_id || 0,
      date: data.date || new Date().toISOString().split('T')[0],
      crop_id: data.crop_id || 0,
      quantity: data.quantity || 0,
      unit: data.unit || 'kg',
      destination: data.destination,
      memo: data.memo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.harvestRecords.set(record.id, record);
    return record;
  }

  getHarvestRecords(userId?: number): HarvestRecord[] {
    const records = Array.from(this.harvestRecords.values());
    if (userId) {
      return records.filter(r => r.user_id === userId);
    }
    return records;
  }

  // 봉지 재배
  createBagRecord(data: Partial<BagRecord>): BagRecord {
    const record: BagRecord = {
      id: this.nextId.bag++,
      user_id: data.user_id || 0,
      date: data.date || new Date().toISOString().split('T')[0],
      crop_id: data.crop_id || 0,
      bag_count: data.bag_count || 0,
      location: data.location,
      memo: data.memo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.bagRecords.set(record.id, record);
    return record;
  }

  getBagRecords(userId?: number): BagRecord[] {
    const records = Array.from(this.bagRecords.values());
    if (userId) {
      return records.filter(r => r.user_id === userId);
    }
    return records;
  }

  // 입고 예약
  createDeliveryReservation(data: Partial<DeliveryReservation>): DeliveryReservation {
    const status = (data.status && ['pending', 'confirmed', 'cancelled'].includes(data.status)) 
      ? data.status as 'pending' | 'confirmed' | 'cancelled'
      : 'pending';
    
    const record: DeliveryReservation = {
      id: this.nextId.delivery++,
      farmer_username: data.farmer_username || '',
      farmer_id: data.farmer_id,
      farmer_name: data.farmer_name || '',
      contact_phone: data.contact_phone || '',
      affiliation: data.affiliation || '',
      reservation_date: data.reservation_date || '',
      expected_quantity_container: data.expected_quantity_container || 0,
      notes: data.notes,
      status,
      created_at: data.created_at || new Date().toISOString(),
    };
    this.deliveryReservations.set(record.id, record);
    return record;
  }

  getDeliveryReservations(farmerUsername?: string, status?: string): DeliveryReservation[] {
    let records = Array.from(this.deliveryReservations.values());
    if (farmerUsername) {
      records = records.filter(r => r.farmer_username === farmerUsername);
    }
    if (status) {
      records = records.filter(r => r.status === status);
    }
    return records;
  }

  updateDeliveryReservation(id: number, status: string): DeliveryReservation | null {
    const record = this.deliveryReservations.get(id);
    if (record && ['pending', 'confirmed', 'cancelled'].includes(status)) {
      record.status = status as 'pending' | 'confirmed' | 'cancelled';
      this.deliveryReservations.set(id, record);
      return record;
    }
    return null;
  }

  // 통계
  getTotalRecords(): number {
    return this.dailyRecords.size + this.pesticideRecords.size + 
           this.irrigationRecords.size + this.harvestRecords.size + 
           this.bagRecords.size;
  }

  getTodayRecords(): number {
    const today = new Date().toISOString().split('T')[0];
    let count = 0;
    count += Array.from(this.dailyRecords.values()).filter(r => r.date === today).length;
    count += Array.from(this.pesticideRecords.values()).filter(r => r.date === today).length;
    count += Array.from(this.irrigationRecords.values()).filter(r => r.date === today).length;
    count += Array.from(this.harvestRecords.values()).filter(r => r.date === today).length;
    count += Array.from(this.bagRecords.values()).filter(r => r.date === today).length;
    return count;
  }
}

export const storageService = new StorageService();
