import { DBUser } from '@studysync/types';
import { API_BASE_URL } from '@/constants';

export class UserRequest {
  static async getUser() {
    const userRaw = await fetch(`${API_BASE_URL}/api/users`);
    const user = (await userRaw.json()) as DBUser;

    return user;
  }
}
