import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Crucial for GitHub Pages (https://<username>.github.io/<repo>/)
  server: {
    port: 8089,
    strictPort: true,
    open: true
  }
});
