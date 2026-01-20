// 인증 서비스
// 사용자 인증 및 권한 관리

import { loggingService } from './monitoring';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: 'farmer' | 'admin';
  farmName?: string;
  phone?: string;
  cropId?: number; // 품목 ID
  cropName?: string; // 품목명
  canAccessFarmerPages?: boolean; // 관리자가 농가 페이지 접근 가능 여부
  createdAt: Date;
}

/**
 * 간단한 비밀번호 해싱 (개발용)
 * 프로덕션에서는 bcrypt 등 안전한 해싱 라이브러리 사용 권장
 */
function hashPassword(password: string): string {
  // 간단한 해시 (개발용)
  // 프로덕션에서는 bcrypt.hash(password, 10) 사용
  // Node.js 환경에서 안전하게 Base64 인코딩
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(password).toString('base64');
  }
  return btoa(password); // 브라우저 환경용
}

function verifyPassword(password: string, hash: string): boolean {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(password).toString('base64') === hash;
  }
  return btoa(password) === hash;
}

/**
 * 인증 서비스
 */
export class AuthService {
  private users: Map<string, User> = new Map();
  private nextId = 1;

  constructor() {
    // 초기 계정 생성
    // 관리자 계정들 (농가 페이지 접근 권한 부여)
    this.createAdminUser('thetree', '0915', true);
    this.createAdminUser('thetree79', '0915', true);
    // 기존 관리자 계정 (호환성 유지, 농가 페이지 접근 권한 부여)
    this.createAdminUser('김희준', '0915', true);
  }

  /**
   * 관리자 계정 생성 (public)
   * @param canAccessFarmerPages 농가 페이지 접근 권한 (기본값: false)
   */
  createAdminUser(username: string, password: string, canAccessFarmerPages: boolean = false): User {
    const user: User = {
      id: this.nextId++,
      username,
      passwordHash: hashPassword(password),
      role: 'admin',
      canAccessFarmerPages,
      createdAt: new Date(),
    };

    this.users.set(username, user);
    loggingService.info(`관리자 계정 생성: ${username}`, { canAccessFarmerPages });
    
    return user;
  }

  /**
   * 농가 계정 생성
   */
  createFarmerUser(
    username: string,
    password: string,
    farmName?: string,
    phone?: string,
    cropId?: number,
    cropName?: string
  ): User {
    const user: User = {
      id: this.nextId++,
      username,
      passwordHash: hashPassword(password),
      role: 'farmer',
      farmName,
      phone,
      cropId,
      cropName,
      createdAt: new Date(),
    };

    this.users.set(username, user);
    loggingService.info(`농가 계정 생성: ${username}`, { farmName, cropId, cropName });
    
    return user;
  }

  /**
   * 로그인 인증
   * username 또는 farmName으로 로그인 가능
   */
  async authenticate(username: string, password: string): Promise<{ success: boolean; user?: User; token?: string }> {
    // 먼저 username으로 찾기
    let user = this.users.get(username);
    
    // username으로 찾지 못하면 farmName으로 찾기 (농가의 경우)
    if (!user) {
      for (const u of this.users.values()) {
        if (u.role === 'farmer' && u.farmName === username) {
          user = u;
          break;
        }
      }
    }

    if (!user) {
      loggingService.warn(`로그인 시도: 사용자를 찾을 수 없음`, { username });
      return { success: false };
    }

    if (!verifyPassword(password, user.passwordHash)) {
      loggingService.warn(`로그인 시도: 비밀번호 불일치`, { username });
      return { success: false };
    }

    // 간단한 토큰 생성 (개발용)
    // 프로덕션에서는 JWT 사용 권장
    const token = this.generateToken(user);

    loggingService.info(`로그인 성공`, { username, role: user.role });

    return {
      success: true,
      user: {
        ...user,
        passwordHash: '', // 비밀번호 해시는 응답에서 제외
      } as any,
      token,
    };
  }

  /**
   * 토큰 검증
   */
  async verifyToken(token: string): Promise<User | null> {
    try {
      // 간단한 토큰 디코딩 (개발용)
      const decodeBase64 = (str: string): string => {
        if (typeof Buffer !== 'undefined') {
          return Buffer.from(str, 'base64').toString('utf8');
        }
        return decodeURIComponent(escape(atob(str))); // 브라우저 환경용 (한글 지원)
      };
      
      const payload = JSON.parse(decodeBase64(token.split('.')[1]));
      const user = this.users.get(payload.username);

      if (!user || payload.exp < Date.now()) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
  }

  /**
   * 토큰 생성 (개발용)
   * 프로덕션에서는 JWT 사용 권장
   */
  private generateToken(user: User): string {
    const payload = {
      username: user.username,
      role: user.role,
      id: user.id,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24시간
    };

    const header = { alg: 'none', typ: 'JWT' };
    
    // Node.js 환경에서 안전하게 Base64 인코딩 (한글 지원)
    const encodeBase64 = (str: string): string => {
      if (typeof Buffer !== 'undefined') {
        return Buffer.from(str, 'utf8').toString('base64');
      }
      return btoa(unescape(encodeURIComponent(str))); // 브라우저 환경용 (한글 지원)
    };
    
    return `${encodeBase64(JSON.stringify(header))}.${encodeBase64(JSON.stringify(payload))}.`;
  }

  /**
   * 사용자 조회
   */
  getUser(username: string): User | undefined {
    const user = this.users.get(username);
    if (user) {
      return {
        ...user,
        passwordHash: '', // 비밀번호 해시는 응답에서 제외
      } as any;
    }
    return undefined;
  }

  /**
   * 모든 사용자 조회 (관리자용)
   */
  getAllUsers(): User[] {
    return Array.from(this.users.values()).map(user => ({
      ...user,
      passwordHash: '', // 비밀번호 해시는 응답에서 제외
    } as any));
  }

  /**
   * 사용자 삭제
   */
  deleteUser(username: string): boolean {
    return this.users.delete(username);
  }

  /**
   * 역할별 사용자 조회
   */
  getUsersByRole(role: 'farmer' | 'admin'): User[] {
    return Array.from(this.users.values())
      .filter(user => user.role === role)
      .map(user => ({
        ...user,
        passwordHash: '',
      } as any));
  }
}

// 싱글톤 인스턴스
export const authService = new AuthService();
