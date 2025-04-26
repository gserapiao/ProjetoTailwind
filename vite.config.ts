import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
        usePolling: true
    },
    allowedHosts: process.env.MANUS_COMPUTER_DOMAIN ? [process.env.MANUS_COMPUTER_DOMAIN] : [],
  }
})

