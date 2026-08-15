import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Serve index.html for all routes so React Router handles them
  server: {
    historyApiFallback: true,
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
})
