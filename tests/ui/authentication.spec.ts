import { test } from '@playwright/test';
import { AdminLoginPage } from '../../pages/adminLogin.page';
import { ENV } from '../../utils/env';

test('Admin login works via UI', async ({ page }) => {
  const loginPage = new AdminLoginPage(page);

  await loginPage.login(ENV.ADMIN_USERNAME, ENV.ADMIN_PASSWORD);

  await loginPage.assertLoggedIn();
});
