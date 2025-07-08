import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginVueDevtools from 'vite-plugin-vue-devtools'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePluginVueDevtools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
})