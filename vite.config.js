import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/tests/e2e/**'],
    setupFiles: './tests/unit/setupTests.jsx',
    testMatch: ['src/components/**/*test.jsx'],
  },
})
