// vite.config.js 파일

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/oauth2/authorization' 경로로 시작하는 모든 요청을 백엔드 8080으로 전달
      '/oauth2/authorization': {
        target: 'http://localhost:8080',
        changeOrigin: true, // 호스트 헤더를 대상 URL에 맞게 변경
        secure: false,      // HTTPS 사용하지 않음
      },
      // 로그인 후 콜백 경로도 전달해야 합니다.
      '/login/oauth2/code': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
      // 필요한 API 경로가 있다면 여기에 추가: '/api': { target: 'http://localhost:8080', ... }
    },
    // 프론트엔드 개발 포트가 5173임을 명시 (확인용)
    port: 5173, 
  },
});