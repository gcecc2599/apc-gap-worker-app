// Netlify Functions용 API 엔드포인트
// Hono를 Netlify Functions에서 사용하기 위한 래퍼
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
// src/index.tsx에서 전체 앱을 import
import app from '../../src/index';

// Hono 앱을 Netlify Functions에 맞게 래핑
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    // Hono 앱이 제대로 로드되었는지 확인
    if (!app) {
      console.error('Hono 앱이 로드되지 않았습니다.');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>앱 로드 오류</title></head><body><h1>앱 로드 오류</h1><p>Hono 앱을 불러올 수 없습니다.</p><a href="/">메인으로 돌아가기</a></body></html>',
      };
    }
    // 디버깅을 위한 로그
    console.log('=== Netlify Function 호출 시작 ===');
    console.log('Event path:', event.path);
    console.log('Event rawUrl:', event.rawUrl);
    console.log('Event httpMethod:', event.httpMethod);
    console.log('Event headers:', JSON.stringify(event.headers));
    
    // 실제 요청 경로 추출
    // rawUrl에서 원본 경로를 가져오는 것이 가장 확실함
    let requestPath = '/';
    
    if (event.rawUrl) {
      try {
        const rawUrlObj = new URL(event.rawUrl);
        requestPath = rawUrlObj.pathname;
        // Functions 경로 제거
        if (requestPath.startsWith('/.netlify/functions/api')) {
          requestPath = requestPath.replace('/.netlify/functions/api', '') || '/';
        }
      } catch (e) {
        console.error('rawUrl 파싱 오류:', e);
        // event.path에서 추출 시도
        if (event.path.startsWith('/.netlify/functions/api')) {
          requestPath = event.path.replace('/.netlify/functions/api', '') || '/';
        } else {
          requestPath = event.path || '/';
        }
      }
    } else {
      // rawUrl이 없으면 event.path 사용
      if (event.path.startsWith('/.netlify/functions/api')) {
        requestPath = event.path.replace('/.netlify/functions/api', '') || '/';
      } else {
        requestPath = event.path || '/';
      }
    }
    
    // 쿼리 문자열 처리
    let queryString = '';
    if (event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0) {
      queryString = '?' + new URLSearchParams(event.queryStringParameters as Record<string, string>).toString();
    }
    
    // URL 구성
    const host = event.headers.host || event.headers['x-forwarded-host'] || 'apc-gap-record.netlify.app';
    const protocol = event.headers['x-forwarded-proto'] || 'https';
    const url = new URL(requestPath + queryString, `${protocol}://${host}`);
    
    console.log('요청 경로:', requestPath);
    console.log('최종 URL:', url.toString());
    
    // Request 객체 생성
    const request = new Request(url, {
      method: event.httpMethod,
      headers: new Headers(event.headers as Record<string, string>),
      body: event.body ? event.body : undefined,
    });

    console.log('Hono 앱에 요청 전달 중...');
    
    // Hono 앱이 요청을 처리하도록 위임
    const response = await app.fetch(request);
    
    console.log('응답 상태:', response.status);
    console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));
    
    // Response를 Netlify Functions 형식으로 변환
    const body = await response.text();
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    console.log('응답 본문 길이:', body.length);
    console.log('=== Netlify Function 호출 완료 ===');

    return {
      statusCode: response.status,
      headers,
      body,
    };
  } catch (error) {
    console.error('Netlify Function 오류:', error);
    console.error('Event 정보:', {
      path: event.path,
      rawUrl: event.rawUrl,
      httpMethod: event.httpMethod,
      headers: event.headers,
    });
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>오류</title></head><body><h1>서버 오류</h1><p>요청을 처리하는 중 오류가 발생했습니다.</p><details><summary>상세 정보</summary><pre>${errorMessage}\n${errorStack}</pre></details><a href="/">메인으로 돌아가기</a></body></html>`,
    };
  }
};

export { handler };
