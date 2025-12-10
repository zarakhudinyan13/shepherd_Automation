import axios from 'axios';
import { ENV } from '../utils/env';

export class AuthAPI {
  static async login(): Promise<string> {
    const response = await axios.post(
      `${ENV.BASE_URL}/auth/login`,
      {
        username: ENV.ADMIN_USERNAME,
        password: ENV.ADMIN_PASSWORD,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    // Returns token on success:
    if (response.data?.token) return response.data.token;

    // Fallback for cookie-based auth:
    const cookieHeader = response.headers['set-cookie'];
    if (cookieHeader && cookieHeader.length > 0) return cookieHeader[0];

    throw new Error('Auth failed — no token or cookie returned');
  }
}
