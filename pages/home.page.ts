import { Page } from '@playwright/test';
import { HomeLocators } from '../locators/home.locators';

export class HomePage {
  constructor(private page: Page) {}

  async acceptCookiesIfVisible() {
    const cookieBtn = this.page.locator(HomeLocators.acceptCookiesBtn);
    if (await cookieBtn.isVisible().catch(() => false)) {
      await cookieBtn.click();
    }
  }

  async open() {
    await this.page.goto('/');
    await this.acceptCookiesIfVisible();
  }

  async goToRooms() {
    await this.page.locator(HomeLocators.roomsNav).click();
  }

  async startBooking() {
   const button = this.page.locator(HomeLocators.firstBookNowBtn).first();
   await button.scrollIntoViewIfNeeded();  
   await button.click();
   await this.page.waitForURL(/reservation/); 
 }

}
