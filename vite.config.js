import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Node.js path module for resolving aliases

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Setup '@' alias to point to '/src'
    },
  },
  server: {
    // Configuration du proxy pour les requêtes API en développement
    proxy: {
      // Proxy pour la nouvelle API v2
      '/api/v2': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      // Proxy pour l'API Strapi existante
      '/api': {
        target: 'http://51.159.180.252',
        changeOrigin: true,
        secure: false
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
