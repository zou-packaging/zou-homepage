import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimización para Core Web Vitals
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    // Compresión
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    // Compresión en development
    compress: true,
    // Hot reload optimizado
    hmr: {
      overlay: false
    }
  },
  // Optimización de imágenes
  assetsInclude: ['**/*.webp', '**/*.avif'],
  // Performance hints
  define: {
    __PERFORMANCE_MARK__: JSON.stringify(process.env.NODE_ENV === 'production')
  }
})