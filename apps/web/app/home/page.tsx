import { CreateWorkspace } from './_components/create-workspace';

export const revalidate = 0;

export default async function HomePage() {
  return (
    <div>
      <CreateWorkspace />
    </div>
  );
}
