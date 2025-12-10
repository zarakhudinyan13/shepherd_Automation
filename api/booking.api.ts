import axios from 'axios';
import { ENV } from '../utils/env';

export class BookingAPI {
  static async createBooking(payload: any) {
    const response = await axios.post(
      `${ENV.BASE_URL}/booking/`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
  }
}
