// pages/reservation.page.ts
import { Page, expect } from '@playwright/test';
import { BookingDetails } from '../types/booking.types';
import { ReservationLocators } from '../locators/reservation.locators';

export class ReservationPage {
  constructor(private page: Page) {}

  async selectDates(details: BookingDetails) {
    await this.page.waitForSelector(ReservationLocators.calendar, { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');

    const dates = this.page.locator(ReservationLocators.dayButton);

    await dates.filter({ hasText: details.checkinDay }).first().click();
    await dates.filter({ hasText: details.checkoutDay }).first().click();
  }

  async reserve() {
    // assert the button exists before clicking
    await expect(this.page.locator(ReservationLocators.reserveNowBtn)).toBeVisible({
      timeout: 10000,
    });

    await this.page.locator(ReservationLocators.reserveNowBtn).click();
  }

  async assertReservationAttempted() {
    // After clicking, we assert that the booking card / price summary is still present
    await expect(this.page.locator(ReservationLocators.priceSummaryTitle)).toBeVisible({
      timeout: 10000,
    });

    // also confirm we're still on a reservation page URL
    await expect(this.page).toHaveURL(/\/reservation\//);
  }
}
