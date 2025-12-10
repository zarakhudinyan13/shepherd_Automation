import axios from 'axios';
import { ENV } from '../utils/env';
import { AuthAPI } from './auth.api';

export class RoomAPI {
  static async create(payload: any) {
    const cookie = await AuthAPI.login();
    const response = await axios.post(
      `${ENV.BASE_URL}/room/`,
      payload,
      {
        headers: {
          Cookie: cookie,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }

  static async list() {
    const cookie = await AuthAPI.login();
    const response = await axios.get(`${ENV.BASE_URL}/room/`, {
      headers: { Cookie: cookie },
    });
    return response.data.rooms;
  }
}
