import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      // O ponto de entrada é o seu arquivo SCSS principal
      entry: resolve(__dirname, 'scss/main.scss'),
      formats: ['es'],
      fileName: 'style'
    },
    rollupOptions: {
      // Não queremos empacotar nada além do CSS
      output: {
        assetFileNames: 'style.[ext]'
      }
    },
    // Garante que o CSS não seja embutido em um JS vazio
    copyPublicDir: false
  }
});