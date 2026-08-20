import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/gdg-noida-devfest-2026/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
