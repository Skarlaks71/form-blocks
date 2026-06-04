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
    resolve: {
      alias: {
        '@form-blocks/core': path.resolve(__dirname, '../core/src'),
        '@form-blocks/styles': path.resolve(__dirname, '../styles/scss/main.scss'),
      },
      preserveSymlinks: true,
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'FormBlocks',
        formats: ['es', 'umd'],
        fileName: (format) => `form-blocks.${format}.js`
      },
      rollupOptions: {
        external: isBuild ? ['vue'] : [],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})
