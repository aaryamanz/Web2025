import { defineConfig } from 'vite'
import sass from 'sass'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  }
}) 