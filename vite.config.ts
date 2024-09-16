import react from '@vitejs/plugin-react'

import * as path from 'path'
import { defineConfig } from 'vite'
import pluginChecker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths(),
    pluginChecker({ typescript: true }),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  preview: {
    port: 3030,
    strictPort: false,
  },
  // server: {
  //   port: 3000,
  //   strictPort: true,
  //   // host: true,
  //   // origin: "http://0.0.0.0:8080",
  // },
})
