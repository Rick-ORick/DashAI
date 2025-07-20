import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html', // Ensure this is correct
    },
  },
  esbuild: {
    jsx: 'react', // This enables JSX parsing for .js files
  },
});
