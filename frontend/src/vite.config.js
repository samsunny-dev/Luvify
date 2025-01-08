import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@chakra-ui/react'],
=======
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
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
  },
});
