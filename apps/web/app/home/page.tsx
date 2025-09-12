import { CreateWorkspace } from './_components/create-workspace';
import WorkspaceList from './_components/workspace-list';

export const revalidate = 0;

export default async function HomePage() {
  return (
    <div>
      <header className="py-10 flex flex-col gap-6 items-center">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Welcome to studysync
        </h1>
        <CreateWorkspace />
      </header>
      <hr />

      {/* Workspace List */}
      <main>
        <WorkspaceList />
      </main>
    </div>
  );
}
