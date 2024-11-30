import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'build',  // Change this to 'build' if you want the build folder to be named 'build'
  },
});
