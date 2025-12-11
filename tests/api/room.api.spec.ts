import { test, expect } from "@playwright/test";
import { RoomAPI } from "../../api/room.api";

test("API: can list rooms", async () => {
  const rooms = await RoomAPI.list();
  expect(Array.isArray(rooms)).toBeTruthy();
  expect(rooms.length).toBeGreaterThan(0);
});


//didn't work axios - only sets the cookie when the request contains the frontEnd origin headers
// test("API: admin can create a room", async () => {
//   const payload = {
//     roomName: "999",
//     type: "Single",
//     accessible: true,
//     image: "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
//     description: "Automated test room",
//     features: ["WiFi", "TV"],
//     roomPrice: 123,
//   };
// });
