import 'module-alias/register';
import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  plugins: [...(process.env.NODE_ENV !== 'test' ? [reactRefresh()] : [])],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
});
