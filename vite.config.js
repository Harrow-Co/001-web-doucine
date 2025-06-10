import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Node.js path module for resolving aliases
import {
  fileURLToPath,
  URL
} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Setup '@' alias to point to '/src'
    },
  },
  server: {
    // Configuration du proxy pour les requêtes API en développement
    proxy: {
      // Proxy pour l'API v2
      '/api/v2': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This replaces the additionalData from vue.config.js
        additionalData: `@import "@/assets/styles/variables.scss";` 
      }
    }
  },
  define: {
    // Polyfill pour crypto.getRandomValues
    '__VITE_CRYPTO_RANDOM_VALUES__': 'true'
  }
});
