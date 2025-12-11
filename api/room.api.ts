import axios from "axios";
import { ENV } from "../utils/env";

export class RoomAPI {
  static endpoint = `${ENV.BASE_URL}/api/room`;

  static async list() {
    const response = await axios.get(this.endpoint);
    return response.data.rooms;
  }
    // doesn't work with axios ---- have to comment out
  // static async create(payload: any) {
  //   const cookie = await AuthAPI.login();

  //   const response = await axios.post(
  //     this.endpoint,
  //     payload,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Cookie: cookie,
  //       },
  //       withCredentials: true,
  //     }
  //   );

  //   return response.data; // { success: true }
  // }
}
