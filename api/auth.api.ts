import axios from 'axios';
import { BASE_URL, ADMIN_CREDENTIALS } from '../utils/env';

export class AuthAPI {
  static async login() {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        username: ADMIN_CREDENTIALS.username,
        password: ADMIN_CREDENTIALS.password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    // Some responses return `token`, some return `cookie`, so handle both:
    if (response.data?.token) {
      return response.data.token;
    }

    // Fallback for cookie-based auth
    const cookieHeader = response.headers['set-cookie'];
    if (cookieHeader && cookieHeader.length > 0) {
      return cookieHeader[0];
    }

    throw new Error('Token or session cookie not received from login response');
  }
}
