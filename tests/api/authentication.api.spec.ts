import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../api/auth.api';

test.skip('API authentication provides a token or cookie', async () => {
  const token = await AuthAPI.login();
  expect(token).toBeTruthy();
});
