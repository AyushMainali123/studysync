import { DBUser } from '@studysync/types';
import { Client } from './_components/client/Client';

export default async function Home() {
  const usersRaw = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/all`,
    { cache: 'no-store' }
  );
  const users = (await usersRaw.json()) as { users: DBUser[] };
  return (
    <div>
      {users.users.map((user) => (
        <div key={user?.id}>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      ))}
      <div>
        <Client />
      </div>
    </div>
  );
}
