// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your Express backend
        changeOrigin: true,
        secure: false
        // ❌ DO NOT add "rewrite"
      }
    }
  }
})
