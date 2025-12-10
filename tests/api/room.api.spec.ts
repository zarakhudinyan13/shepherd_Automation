import { test, expect } from '@playwright/test';
import { RoomAPI } from '../../api/room.api';

test.skip('API: can create and list rooms', async () => {
  const payload = {
    roomName: 'API Test Room',
    type: 'Single',
    accessible: true,
    image: 'https://example.com/test.jpg',
    description: 'Test room via API',
    features: [ 'TV', 'WiFi' ],
    price: 100,
  };

  // Create room
  const createResponse = await RoomAPI.create(payload);
  console.log('Room create response:', createResponse);
  expect(createResponse.success).toBe(true);

  // Get room list (admin only)
  const rooms = await RoomAPI.list();
  const exists = rooms.some((r: any) => r.roomName === payload.roomName);
  expect(exists).toBe(true);
});
