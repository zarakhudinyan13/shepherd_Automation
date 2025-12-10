import { test } from '@playwright/test';
import { AdminLoginPage } from '../../pages/adminLogin.page';
import { RoomsPage } from '../../pages/rooms.page';
import { ENV } from '../../utils/env';

test('Admin can create and delete a room', async ({ page }) => {
  const login = new AdminLoginPage(page);
  const rooms = new RoomsPage(page);

  // Login first
  await login.login(ENV.ADMIN_USERNAME, ENV.ADMIN_PASSWORD);

  // Navigate to Rooms
  await rooms.navigate();

  const randomRoom = `9${Math.floor(Math.random() * 100)}`; // random room number

  // Create a new room
  await rooms.createRoom(randomRoom, 'Double', 'true', '150', ['wifi', 'tv']);

  // Validate it exists
  await rooms.assertRoomVisible(randomRoom);

  // Delete that room
  await rooms.deleteRoom(randomRoom);
});
