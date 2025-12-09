import { test } from '@playwright/test';
import { AdminLoginPage } from '../../pages/adminLogin.page';
import { ADMIN_CREDENTIALS } from '../../utils/env';

test('Admin login works via UI', async ({ page }) => {
  const login = new AdminLoginPage(page);

  await login.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
  await login.assertLoggedIn();
});
