import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase from default 500kb to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['react-icons'],
          'chart': ['chart.js', 'react-chartjs-2'],
        }
      }
    }
  }
})
