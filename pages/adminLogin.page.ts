import { Page, expect } from '@playwright/test';
import { AdminLoginLocators } from '../locators/adminLogin.locators';

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
    await this.page.goto('/admin');
    await this.page.waitForSelector(AdminLoginLocators.usernameInput);
  }

  async login(username: string, password: string) {
    await this.open();
    await this.dismissCookiesIfPresent();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/admin/**', { timeout: 15000 });
  }

  async assertLoggedIn() {
    await expect(this.roomsHeader).toBeVisible();
  }
}
