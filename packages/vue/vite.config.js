import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [
      vue(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'FormBlocks',
        fileName: format => `form-blocks.${format}.js`
      },
      rollupOptions: {
        external: isBuild ? ['vue'] : [],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})
