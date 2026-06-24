import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getRestaurantSchemaGraph } from './src/data/restaurantSchema.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-restaurant-schema',
      transformIndexHtml(html) {
        const schema = JSON.stringify(getRestaurantSchemaGraph()).replace(/</g, '\\u003c')
        return html.replace(
          '<!-- RESTAURANT_SCHEMA -->',
          `<script type="application/ld+json">${schema}</script>`,
        )
      },
    },
  ],
  optimizeDeps: {
    include: ['react-router-dom', 'react-router'],
  },
})
