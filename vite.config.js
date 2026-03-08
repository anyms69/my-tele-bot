import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ВАЖНО: замени на точное название своего репозитория на GitHub
  // Например если репо: github.com/ivan/my-antalya → base: '/my-antalya/'
  // Если репо: github.com/ivan/ivan.github.io     → base: '/'
  base: '/my-tele-bot/',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          store: ['zustand'],
        }
      }
    }
  }
})
