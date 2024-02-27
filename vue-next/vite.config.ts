import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, './src/components/index.ts'),
      name: '@qr-apron/vue-next',
      fileName: '@qr-apron/vue-next'
    },
    rollupOptions: {
      external: ['vue', 'less-loader', 'less'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
