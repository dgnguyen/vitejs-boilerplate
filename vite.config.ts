import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import pluginChecker from 'vite-plugin-checker'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths(), pluginChecker({ typescript: true })],
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
