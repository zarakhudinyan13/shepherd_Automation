import * as dotenv from "dotenv";
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? "https://automationintesting.online",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? "admin",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "password",
};
