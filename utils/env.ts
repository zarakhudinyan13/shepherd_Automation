import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? '',
  BASE_URL: process.env.BASE_URL ?? 'https://automationintesting.online',
};
