import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173/',
    viewportWidth: 1280, // Width of the screen
    viewportHeight: 720, // Height of the screen
  },
})
