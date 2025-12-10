import { defineConfig } from '@playwright/test';

const isCI = process.env.CI === 'true'; // GitHub sets CI=true

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL || 'https://automationintesting.online',
    headless: isCI ? true : false, // 👉 Headed locally, Headless in CI
    screenshot: 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'on', // less CI weight
    trace: 'retain-on-failure',
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
});
