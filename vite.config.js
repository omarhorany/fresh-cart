import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    exclude: ['fsevents']
  },
  plugins: [react()],
  base: "/fresh-cart/"
});