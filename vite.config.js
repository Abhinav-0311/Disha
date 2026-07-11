import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cake: resolve(__dirname, 'cake.html'),
        final: resolve(__dirname, 'final.html'),
        letter: resolve(__dirname, 'letter.html'),
        memories: resolve(__dirname, 'memories.html'),
        reasons: resolve(__dirname, 'reasons.html'),
      },
    },
  },
});
