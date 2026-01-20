import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apc.gap.record',
  appName: 'APC GAP 기록관리',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // 개발 중에는 서버 URL 사용 가능
    // url: 'http://192.168.0.100:8787',
    // cleartext: true
  },
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
};

export default config;
