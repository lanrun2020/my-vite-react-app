import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  server: {
    cors: true,
    open: false,
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/map': {
        target: 'http://localhost:8088/map',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map/, '')
      },
    }
  },
})
