import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: 11,
      },
    }),
    viteCompression({
      algorithm: 'gzip',
    }),
    solidPlugin({
      extensions: ['.ts', '.tsx'],
      babel: {
        plugins: ['effector/babel-plugin'],
      },
    }),
    tsconfigPaths(),
  ],
  clearScreen: false,
  build: {
    target: 'esnext',
    rollupOptions: {
      treeshake: true,
      output: {
        sourcemap: false,
        strict: true,
        manualChunks: {
          'solidjs-vendor': ['solid-js'],
          'effector-vendor': ['effector', 'effector-solid', 'effector-storage'],
          'router-vendor': ['atomic-router', 'atomic-router-solid', 'history'],
          'other-vendor': [
            'clsx',
            'myzod',
            'blurhash',
            '@solid-primitives/intersection-observer',
          ],
        },
      },
    },
  },
  server: {
    hmr: true,
    host: true,
    port: 3000,
  },
  root: '.',
});
