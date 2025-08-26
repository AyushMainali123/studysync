import { DBUser } from '@studysync/types';
import { API_BASE_URL } from '@/constants';

export class UserRequest {
  static async getAllusers() {
    const usersRaw = await fetch(`${API_BASE_URL}/api/users/all`);
    const users = (await usersRaw.json()) as { users: DBUser[] };

    return users;
  }
}
