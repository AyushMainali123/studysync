import { Client } from './_components/client/Client';
import { ServiceFactory } from '@/lib/factory/service-factory';

export default async function Home() {
  const users = await ServiceFactory.userService().getAllUsers();
  return (
    <div>
      {users.map((user) => (
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
