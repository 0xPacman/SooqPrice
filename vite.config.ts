import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      'b9c9-197-253-216-116.ngrok-free.app'
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
