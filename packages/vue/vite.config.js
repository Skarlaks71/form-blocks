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
        entry: {
          index: path.resolve(__dirname, 'src/index.js'),
          styles: path.resolve(__dirname, 'src/styles.js'),
        },
        name: 'FormBlocks',
        fileName: (format, entryName) => `${entryName}.${format}.js`
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
