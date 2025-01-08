<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public/assets'),
    },
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true,
    },
  },
});
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
