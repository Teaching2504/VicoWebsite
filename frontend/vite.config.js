import react from '@vitejs/plugin-react'
import process from 'node:process'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repository from /VicoWebsite/; local development stays at /.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/VicoWebsite/' : '/',
  plugins: [react()],
})
