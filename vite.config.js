import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/AlgoFirmament/', // GitHub Pages base path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './AlgoFirm-index.html',
        merged: './merged-index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});