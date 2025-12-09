import { Page, expect } from '@playwright/test';
import { RoomLocators } from '../locators/rooms.locators';

export class RoomsPage {
  constructor(private page: Page) {}

  // ---------- GLOBAL HANDLERS ----------
  private get acceptCookieBtn() {
    return this.page.getByRole('button', { name: 'Accept' });
  }

  async dismissCookiesIfPresent() {
    try {
      if (await this.acceptCookieBtn.isVisible()) {
        await this.acceptCookieBtn.click();
      }
    } catch (_) {
      // Ignore if not visible or stale
    }
  }

  // ---------- PAGE NAVIGATION ----------
  async navigate() {
    await this.dismissCookiesIfPresent();

    // If login just happened, wait for redirect
    await this.page.waitForURL('**/admin**', { timeout: 15000 });

    // Navigate only if needed
    if (!this.page.url().includes('/admin/rooms')) {
      await this.page.goto('/admin/rooms');
    }

    await this.dismissCookiesIfPresent();

    // Wait for rooms table and form to render
    await this.page.waitForSelector('[data-testid="roomlisting"]', { timeout: 15000 });
    await this.page.waitForSelector(RoomLocators.roomNameInput, { timeout: 15000 });
  }

  // ---------- UI ELEMENTS ----------
  private get roomName() {
    return this.page.locator(RoomLocators.roomNameInput);
  }

  private get roomType() {
    return this.page.locator(RoomLocators.roomTypeSelect);
  }

  private get accessible() {
    return this.page.locator(RoomLocators.accessibleSelect);
  }

  private get price() {
    return this.page.locator(RoomLocators.priceInput);
  }

  private feature(feature: keyof typeof RoomLocators.features) {
    return this.page.locator(RoomLocators.features[feature]);
  }

  private get createButton() {
    return this.page.locator(RoomLocators.createButton);
  }

  private get roomCards() {
    return this.page.locator(RoomLocators.roomCard);
  }

  deleteRoomById(id: string) {
      return this.page.locator(`[data-testid="roomlisting"] ${RoomLocators.deleteButton}[id="${id}"]`);
  }

async getDeleteIdForRoom(roomNumber: string): Promise<string> {
   const row = this.page.locator(`[data-testid="roomlisting"]`).filter({
     has: this.page.locator(`#roomName${roomNumber}`)
   });

   const deleteButton = row.locator(RoomLocators.deleteButton);
   const id = await deleteButton.getAttribute('id');

   if (!id) throw new Error(`Delete icon ID not found for room ${roomNumber}`);
   return id;
  }


  // ---------- ACTIONS ----------
  async createRoom(
    number: string,
    type: string,
    accessible: string,
    price: string,
    features: (keyof typeof RoomLocators.features)[]
  ) {
    await this.dismissCookiesIfPresent();

    await this.roomName.fill(number);
    await this.roomType.selectOption(type, { force: true });
    await this.accessible.selectOption(accessible, { force: true });
    await this.price.fill(price);

    for (const feat of features) {
      await this.feature(feat).check({ force: true });
    }

    await this.createButton.click();

    // Wait for room list to update
    await this.page.waitForTimeout(500);
  }

  async assertRoomVisible(number: string) {
    await expect(
      this.page.locator(`#roomName${number}`)
    ).toBeVisible({ timeout: 10000 });
  }

  async deleteRoom(number: string) {
    await this.dismissCookiesIfPresent();
    const deleteId = await this.getDeleteIdForRoom(number);
    await this.deleteRoomById(deleteId).click();
    await this.page.waitForTimeout(300);
  }
}
