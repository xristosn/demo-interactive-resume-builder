import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  resolve: {
    alias: {
      html2canvas: resolve(__dirname, 'node_modules', 'html2canvas-pro'),
    },
  },
});

