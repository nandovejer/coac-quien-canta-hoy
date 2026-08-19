import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import seoPlugin from './vite-plugin-seo'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
  base: "/coac-quien-canta-hoy/"
})
