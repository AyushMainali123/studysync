'use client';

import { UserRequest } from '@/requests/user-request';
import { DBUser } from '@studysync/types';
import { useEffect, useState } from 'react';

export function Client() {
  const [users, setUsers] = useState<DBUser[]>();
  useEffect(() => {
    async function fetchUsers() {
      const response = await UserRequest.getAllusers();
      setUsers(response.users);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      {users?.map((user) => (
        <div key={user?.id}>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      ))}
    </div>
  );
}
