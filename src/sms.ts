// SMS 알림 시스템 (Twilio)
// TODO: Twilio SDK 설치 필요 (npm install twilio)

export interface SMSConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

export class SMSService {
  private config: SMSConfig;

  constructor(config: SMSConfig) {
    this.config = config;
  }

  /**
   * SMS 전송
   * @param to 수신자 번호 (예: "+821012345678")
   * @param message 메시지 내용
   * @returns 전송 결과
   */
  async sendSMS(to: string, message: string): Promise<{ success: boolean; sid?: string; error?: string }> {
    try {
      // TODO: Twilio SDK 사용
      // const client = require('twilio')(this.config.accountSid, this.config.authToken);
      // const result = await client.messages.create({
      //   body: message,
      //   from: this.config.fromNumber,
      //   to: to
      // });
      // return { success: true, sid: result.sid };

      // 임시 구현
      console.log(`[SMS] To: ${to}, Message: ${message}`);
      return { success: true, sid: 'dummy-sid' };
    } catch (error) {
      console.error('SMS 전송 오류:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '알 수 없는 오류' 
      };
    }
  }

  /**
   * 여러 사용자에게 SMS 전송
   * @param recipients 수신자 번호 배열
   * @param message 메시지 내용
   * @returns 전송 결과 배열
   */
  async sendBulkSMS(recipients: string[], message: string): Promise<Array<{ to: string; success: boolean; error?: string }>> {
    const results = await Promise.all(
      recipients.map(async (to) => {
        const result = await this.sendSMS(to, message);
        return {
          to,
          success: result.success,
          error: result.error
        };
      })
    );
    
    return results;
  }

  /**
   * 안전수확일 알림 SMS 전송
   * @param userPhone 사용자 전화번호
   * @param cropName 작물명
   * @param safeHarvestDate 안전수확일
   */
  async sendPHINotification(userPhone: string, cropName: string, safeHarvestDate: string): Promise<{ success: boolean }> {
    const message = `[농가 수출 기록관리 시스템] ${cropName}의 안전수확일은 ${safeHarvestDate}입니다.`;
    const result = await this.sendSMS(userPhone, message);
    return { success: result.success };
  }

  /**
   * 작업 추천 알림 SMS 전송
   * @param userPhone 사용자 전화번호
   * @param recommendations 추천 작업 목록
   */
  async sendRecommendationNotification(userPhone: string, recommendations: string[]): Promise<{ success: boolean }> {
    const message = `[농가 수출 기록관리 시스템] 추천 작업:\\n${recommendations.join('\\n- ')}`;
    const result = await this.sendSMS(userPhone, message);
    return { success: result.success };
  }
}

// 싱글톤 인스턴스 (환경 변수에서 설정 읽기)
export function createSMSService(): SMSService | null {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio 설정이 없습니다. SMS 기능이 비활성화됩니다.');
    return null;
  }

  return new SMSService({
    accountSid,
    authToken,
    fromNumber
  });
}

// Cron 작업용 스케줄러 (Cloudflare Workers Cron Triggers)
export async function scheduledSMSNotification(event: ScheduledEvent, env: any) {
  const smsService = createSMSService();
  if (!smsService) {
    console.warn('SMS 서비스가 설정되지 않았습니다.');
    return;
  }

  // TODO: D1 DB에서 알림 대상 조회
  // const users = await env.DB.prepare('SELECT * FROM users WHERE ...').all();
  
  // TODO: 각 사용자에게 알림 전송
  // for (const user of users.results) {
  //   await smsService.sendPHINotification(user.phone, user.crop, user.safe_harvest_date);
  // }
}
