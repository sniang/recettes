import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Le site est publié sur GitHub Pages à l'adresse https://sniang.github.io/recettes/
export default defineConfig({
  base: '/recettes/',
  plugins: [react()],
})
