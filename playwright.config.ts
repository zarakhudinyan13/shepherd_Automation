import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://automationintesting.online',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on',
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
});
