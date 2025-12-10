import { Page, expect } from '@playwright/test';
import { AdminLoginLocators } from '../locators/adminLogin.locators';
import { ENV } from '../utils/env';

export class AdminLoginPage {
  constructor(private page: Page) {}

  private get usernameInput() {
    return this.page.locator(AdminLoginLocators.usernameInput);
  }

  private get passwordInput() {
    return this.page.locator(AdminLoginLocators.passwordInput);
  }

  private get loginButton() {
    return this.page.locator(AdminLoginLocators.loginButton);
  }

  private get roomsHeader() {
    return this.page.locator(AdminLoginLocators.roomsHeader);
  }

  private get acceptCookieBtn() {
    return this.page.getByRole('button', { name: 'Accept' });
  }

  async dismissCookiesIfPresent() {
    if (await this.acceptCookieBtn.isVisible().catch(() => false)) {
      await this.acceptCookieBtn.click();
    }
  }

  async open() {
    await this.page.goto(ENV.BASE_URL);
    await this.dismissCookiesIfPresent();
    await this.page.getByRole('link', { name: 'Admin', exact: true }).click();
    await this.page.waitForSelector('#username'); // Wait for login form
  }
  
  async login(username: string, password: string) {
    await this.open();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/admin/, { timeout: 20000 });
    await expect(this.roomsHeader).toBeVisible({ timeout: 15000 });
  }  

  async assertLoggedIn() {

    await expect(this.roomsHeader).toBeVisible();
  }
}
