import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [
      vue(),
      Components({
        resolvers: [BootstrapVueNextResolver()]
      })
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
