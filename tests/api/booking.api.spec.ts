import { test, expect } from "@playwright/test";
import { BookingAPI } from "../../api/booking.api";

test("API: cannot create a booking without required fields (negative test)", async () => {
  const payload = {
    firstname: "Zara"
    // all other fields missing → intentionally invalid
  };

  const response = await BookingAPI.createRaw(payload);

  expect(response.status).toBe(400);
  expect(response.data).toHaveProperty("errors"); 
  expect(Array.isArray(response.data.errors)).toBe(true);
  expect(response.data.errors.length).toBeGreaterThan(0);
});
