import { DBUser } from '@studysync/types';
// import { Client } from './_components/client/Client';

export default async function Home() {
  const usersRaw = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    cache: 'no-store',
  });
  const users = (await usersRaw.json()) as DBUser[];
  return (
    <div>
      {users.map((user) => (
        <div key={user?.id}>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      ))}
      <div>{/* <Client /> */}</div>
    </div>
  );
}
