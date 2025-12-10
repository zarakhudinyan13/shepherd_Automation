import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ReservationPage } from '../../pages/reservation.page';
import { BookingDetails } from '../../types/booking.types';

test('UI: user can reserve a room', async ({ page }) => {
  const home = new HomePage(page);
  const reservation = new ReservationPage(page);

  await home.open();
  await home.goToRooms();
  await home.startBooking();

  const data: BookingDetails = {
    checkinDay: '10',
    checkoutDay: '11',
  };

  await reservation.selectDates(data);
  await reservation.reserve();
  await reservation.assertReservationAttempted();
});
