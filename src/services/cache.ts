// 캐싱 시스템
// GenSpark의 프롬프트 캐싱 및 긴 컨텍스트 처리 패턴 적용

interface CacheEntry<T> {
  key: string;
  value: T;
  expiresAt: number;
  createdAt: number;
  accessCount: number;
  lastAccessed: number;
}

/**
 * 인메모리 캐시 관리자
 * GenSpark의 캐싱 전략을 참고하여 구현
 */
export class CacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL = 3600000; // 1시간 (밀리초)

  /**
   * 캐시에 값 저장
   * @param key 캐시 키
   * @param value 저장할 값
   * @param ttl Time to Live (밀리초), 기본값 1시간
   */
  set<T>(key: string, value: T, ttl: number = this.defaultTTL): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      key,
      value,
      expiresAt: now + ttl,
      createdAt: now,
      accessCount: 0,
      lastAccessed: now,
    };

    this.cache.set(key, entry);
    this.cleanup(); // 만료된 항목 정리
  }

  /**
   * 캐시에서 값 조회
   * @param key 캐시 키
   * @returns 캐시된 값 또는 undefined
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // 만료 확인
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    // 접근 통계 업데이트
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    return entry.value as T;
  }

  /**
   * 캐시 키 존재 여부 확인 (만료 여부 포함)
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * 캐시에서 항목 삭제
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * 전체 캐시 비우기
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 만료된 항목 정리
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 캐시 통계 조회
   */
  getStats(): {
    totalEntries: number;
    totalSize: number;
    hitRate: number;
    mostAccessed: Array<{ key: string; count: number }>;
  } {
    const entries = Array.from(this.cache.values());
    const totalSize = entries.reduce((sum, entry) => {
      return sum + JSON.stringify(entry.value).length;
    }, 0);

    const mostAccessed = entries
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 10)
      .map(entry => ({ key: entry.key, count: entry.accessCount }));

    return {
      totalEntries: this.cache.size,
      totalSize,
      hitRate: 0, // TODO: hit/miss 통계 구현
      mostAccessed,
    };
  }

  /**
   * 프롬프트/쿼리 기반 캐시 키 생성
   * 동일한 쿼리는 동일한 키를 생성
   */
  generateKey(prefix: string, ...params: any[]): string {
    const paramString = JSON.stringify(params);
    const hash = this.simpleHash(paramString);
    return `${prefix}:${hash}`;
  }

  /**
   * 간단한 해시 함수
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

// 싱글톤 인스턴스
export const cacheService = new CacheService();

/**
 * 캐시 데코레이터 (함수 래퍼)
 * 함수 결과를 자동으로 캐싱
 */
export function cached<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyPrefix: string,
  ttl?: number
): T {
  const cache = cacheService;

  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const key = cache.generateKey(keyPrefix, ...args);

    // 캐시에서 조회
    const cached = cache.get<ReturnType<T>>(key);
    if (cached !== undefined) {
      return cached;
    }

    // 캐시 미스: 함수 실행
    const result = await fn(...args);

    // 결과 캐싱
    cache.set(key, result, ttl);

    return result;
  }) as T;
}
