import axios from 'axios';
import { ENV } from '../utils/env';

export class AuthAPI {
  static async login() {
    const response = await axios.post(
      `${ENV.BASE_URL}/api/auth/login`,
      {
        username: ENV.ADMIN_USERNAME,
        password: ENV.ADMIN_PASSWORD,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    // 1) If API returns token JSON (some environments do)
    if (response.data?.token) {
      return `token=${response.data.token}`;
    }

    // 2) Otherwise, extract cookie from response headers
    const cookieHeader = response.headers['set-cookie'];
    if (cookieHeader && cookieHeader.length > 0) {
      // We only need the session value, not other metadata
      return cookieHeader[0].split(';')[0];
    }

    throw new Error('❌ Auth login failed: No token or cookie received');
  }
}
