import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    hmr: {
      overlay: false
    },
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    force: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});