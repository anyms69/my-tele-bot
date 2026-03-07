import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ВАЖНО: укажи точное название своего репозитория
  base: '/my-tele-bot/',
  server: {
    port: 3000,
  },
})
