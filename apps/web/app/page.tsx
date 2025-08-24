import { DBUser } from "@studysync/types";

export default async function Home() {
 const resRaw = await fetch('http://localhost:8000/api/users/all');
 const users = await resRaw.json() as {users: DBUser[]};
  return (
   <div>
     {users.users.map(user => (
       <div key={user?.id}>
         <h2>{user?.name}</h2>
         <p>{user?.email}</p>
       </div>
     ))}
   </div>
  );
}
