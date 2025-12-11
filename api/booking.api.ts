import axios from "axios";
import { ENV } from "../utils/env";

export class BookingAPI {
  static endpoint = `${ENV.BASE_URL}/api/booking`;

  // Raw version for negative tests
  static async createRaw(payload: any) {
    try {
      return await axios.post(this.endpoint, payload, {
        validateStatus: () => true, // allow axios to return error responses
      });
    } catch (err) {
      throw err;
    }
  }
}
