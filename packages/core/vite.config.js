import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      // O arquivo principal que exporta tudo do core
      entry: {
        index: resolve(__dirname, 'src/index.js'),
        'constants/index': resolve(__dirname, 'src/constants/index.js')
      },
      name: 'FormBlocksCore',
      fileName: 'index',
      formats: ['es'] // Focaremos em ES Modules para o monorepo
    },
    rollupOptions: {
      // Garanta que dependências externas (como lodash) não sejam embutidas se você quiser
      // Mas para o core, geralmente é seguro embutir ou listar aqui:
      external: ['lodash.clonedeep'],
      output: {
        // Isso garante que o nome da entrada (ex: 'constants/index') 
        // seja usado como o caminho do arquivo na dist
        entryFileNames: '[name].js',
        preserveModules: false // Queremos apenas que ele respeite os entry points
      }
    }
  }
});