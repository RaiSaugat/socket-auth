import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const url =
    env.VITE_APP_HOST_ENV === 'development'
      ? env.VITE_APP_API_BASE_URL_LOCAL
      : env.VITE_APP_API_BASE_URL_PRODUCTION;

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: url,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
