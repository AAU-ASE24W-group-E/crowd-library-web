import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul', // Use 'istanbul' for detailed coverage options
        reporter: ['text', 'lcov'],
        reportsDirectory: './coverage',
        all: true,
        exclude: [
          'node_modules/',
          'test/',
          'tests/',
          '**/__tests__/**',
          '**/*.test.{js,ts,jsx,tsx}',
          '**/*.spec.{js,ts,jsx,tsx}',
          '**/*.d.ts',
          'src/views/static/',
          'src/components/POIMapComponent.vue',
          'src/components/LocationSelectionMap.vue',
        ],
      },
    },
  }),
)
