// 로깅 및 모니터링 시스템
// GenSpark의 작업 추적 및 피드백 루프 패턴 적용

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  userId?: string;
  requestId?: string;
  duration?: number; // 밀리초
}

export interface Metric {
  name: string;
  value: number;
  unit?: string;
  tags?: Record<string, string>;
  timestamp: Date;
}

/**
 * 로깅 서비스
 * GenSpark의 작업 추적 방식 참고
 */
export class LoggingService {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // 최대 저장 로그 수

  /**
   * 로그 기록
   */
  log(
    level: LogLevel,
    message: string,
    context?: Record<string, any>
  ): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context,
    };

    this.logs.push(entry);

    // 최대 로그 수 초과 시 오래된 로그 삭제
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // 콘솔 출력
    const prefix = `[${level.toUpperCase()}]`;
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    console.log(`${prefix} ${message}${contextStr}`);
  }

  /**
   * DEBUG 로그
   */
  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * INFO 로그
   */
  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * WARN 로그
   */
  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * ERROR 로그
   */
  error(message: string, error?: Error | any, context?: Record<string, any>): void {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
    };
    this.log(LogLevel.ERROR, message, errorContext);
  }

  /**
   * 로그 조회
   */
  getLogs(
    level?: LogLevel,
    startTime?: Date,
    endTime?: Date,
    limit?: number
  ): LogEntry[] {
    let filtered = this.logs;

    if (level) {
      filtered = filtered.filter(log => log.level === level);
    }

    if (startTime) {
      filtered = filtered.filter(log => log.timestamp >= startTime);
    }

    if (endTime) {
      filtered = filtered.filter(log => log.timestamp <= endTime);
    }

    if (limit) {
      filtered = filtered.slice(-limit);
    }

    return filtered;
  }

  /**
   * 최근 에러 로그 조회
   */
  getRecentErrors(limit: number = 10): LogEntry[] {
    return this.getLogs(LogLevel.ERROR, undefined, undefined, limit);
  }

  /**
   * 로그 통계
   */
  getStats(): {
    total: number;
    byLevel: Record<LogLevel, number>;
    errorRate: number;
  } {
    const byLevel: Record<LogLevel, number> = {
      [LogLevel.DEBUG]: 0,
      [LogLevel.INFO]: 0,
      [LogLevel.WARN]: 0,
      [LogLevel.ERROR]: 0,
    };

    for (const log of this.logs) {
      byLevel[log.level]++;
    }

    const total = this.logs.length;
    const errorRate = total > 0 ? byLevel[LogLevel.ERROR] / total : 0;

    return {
      total,
      byLevel,
      errorRate,
    };
  }
}

/**
 * 메트릭 서비스
 */
export class MetricService {
  private metrics: Metric[] = [];
  private maxMetrics = 5000;

  /**
   * 메트릭 기록
   */
  record(
    name: string,
    value: number,
    unit?: string,
    tags?: Record<string, string>
  ): void {
    const metric: Metric = {
      name,
      value,
      unit,
      tags,
      timestamp: new Date(),
    };

    this.metrics.push(metric);

    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  /**
   * API 응답 시간 기록
   */
  recordResponseTime(endpoint: string, duration: number, statusCode: number): void {
    this.record('api_response_time', duration, 'ms', {
      endpoint,
      statusCode: statusCode.toString(),
    });
    
    // 상태 코드별 메트릭
    this.record(`api_${statusCode}`, 1, 'count', { endpoint });
  }

  /**
   * 메트릭 조회
   */
  getMetrics(
    name?: string,
    startTime?: Date,
    endTime?: Date
  ): Metric[] {
    let filtered = this.metrics;

    if (name) {
      filtered = filtered.filter(m => m.name === name);
    }

    if (startTime) {
      filtered = filtered.filter(m => m.timestamp >= startTime);
    }

    if (endTime) {
      filtered = filtered.filter(m => m.timestamp <= endTime);
    }

    return filtered;
  }

  /**
   * 메트릭 집계
   */
  aggregate(
    name: string,
    startTime?: Date,
    endTime?: Date
  ): {
    count: number;
    sum: number;
    avg: number;
    min: number;
    max: number;
  } {
    const metrics = this.getMetrics(name, startTime, endTime);
    
    if (metrics.length === 0) {
      return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
    }

    const values = metrics.map(m => m.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
      count: metrics.length,
      sum,
      avg,
      min,
      max,
    };
  }
}

// 싱글톤 인스턴스
export const loggingService = new LoggingService();
export const metricService = new MetricService();
