import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Замени 'antalya-miniapp' на название твоего репозитория на GitHub
  // Если репозиторий называется username.github.io — оставь base: '/'
  base: '/anyms69.github.io/my-tele-bot/',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
