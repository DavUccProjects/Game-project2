import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // Incluir JSX en archivos .js
    include: "**/*.{jsx,js}",
  })],
})