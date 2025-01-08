import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      
      '@pages': path.resolve(__dirname, 'src/pages'),
      // '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', 
    },
  },
});
