// 에러 처리 및 재시도 로직
// GenSpark의 backtracking 패턴 적용

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryCondition?: (error: any) => boolean;
}

/**
 * 재시도 로직이 포함된 함수 래퍼
 * GenSpark의 backtracking 패턴 참고
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2,
    retryCondition = () => true, // 기본적으로 모든 에러 재시도
  } = options;

  let lastError: any;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();
      
      // 성공 시 지연 초기화
      if (attempt > 0) {
        delay = initialDelay;
      }
      
      return result;
    } catch (error) {
      lastError = error;

      // 재시도 가능 여부 확인
      if (attempt >= maxRetries || !retryCondition(error)) {
        throw error;
      }

      // 지수 백오프 (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffMultiplier, maxDelay);
    }
  }

  throw lastError;
}

/**
 * 타임아웃이 포함된 함수 래퍼
 */
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  timeoutMessage?: string
): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error(timeoutMessage || `작업이 ${timeoutMs}ms 내에 완료되지 않았습니다.`));
      }, timeoutMs);
    }),
  ]);
}

/**
 * 재시도 및 타임아웃 조합
 */
export async function withRetryAndTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  retryOptions?: RetryOptions
): Promise<T> {
  return withRetry(
    () => withTimeout(fn, timeoutMs),
    retryOptions
  );
}

/**
 * 안전한 함수 실행 (에러 캐치)
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  fallback?: T,
  onError?: (error: any) => void
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    if (onError) {
      onError(error);
    }
    return fallback;
  }
}

/**
 * 네트워크 요청 재시도 헬퍼
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> {
  return withRetry(
    async () => {
      const response = await fetch(url, options);
      
      // HTTP 에러는 재시도 대상 (5xx, 429)
      if (!response.ok && (response.status >= 500 || response.status === 429)) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    },
    {
      ...retryOptions,
      retryCondition: (error) => {
        // 네트워크 에러나 5xx, 429만 재시도
        return error instanceof TypeError || // 네트워크 에러
               (error instanceof Error && error.message.includes('HTTP 5')) ||
               (error instanceof Error && error.message.includes('HTTP 429'));
      },
    }
  );
}
