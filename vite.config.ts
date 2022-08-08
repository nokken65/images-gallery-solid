import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    // viteCompression({
    //   algorithm: 'brotliCompress',
    //   compressionOptions: {
    //     level: 11,
    //   },
    // }),
    // viteCompression({
    //   algorithm: 'gzip',
    // }),
    // splitVendorChunkPlugin(),
    solidPlugin({
      extensions: ['.ts', '.tsx'],
      babel: {
        plugins: ['effector/babel-plugin'],
      },
    }),
    tsconfigPaths(),
  ],
  clearScreen: false,
  build: { target: 'esnext' },
  server: {
    hmr: true,
    host: true,
    port: 3000,
  },
  root: '.',
});
