import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'My PWA App',
      short_name: 'PWAApp',
      description: 'React + TS PWA',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo-free.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'logo-free.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
})
