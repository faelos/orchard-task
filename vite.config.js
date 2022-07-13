import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  css: {
    postcss: {
      plugins: [
        require('lost'),
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/scss/mixins/_all.scss";', // imported into every component. Mixins and %placeholders only! global styles from `scss/globals/` are imported in App.vue
      },
    }
  }
})
