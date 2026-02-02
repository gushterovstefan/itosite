import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Accessible from LAN: binds to 0.0.0.0
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
})
