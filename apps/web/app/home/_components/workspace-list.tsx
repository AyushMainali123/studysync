import { API_BASE_URL } from '@/constants';
import { DBWorkspace } from '@studysync/types';
import {
  TypographyP,
  TypographyH4,
  TypographyMuted,
} from '@studysync/ui/components/typography';
import Link from 'next/link';

type WorkspacesResponse = { workspaces: DBWorkspace[] };

export default async function WorkspaceList() {
  let workspaces: DBWorkspace[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/workspace`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load workspaces');
    const data = (await res.json()) as WorkspacesResponse;
    workspaces = data.workspaces ?? [];
  } catch {
    return (
      <section className="rounded-lg border border-border bg-card p-6 text-card-foreground">
        <TypographyH4>Your Workspaces</TypographyH4>
        <TypographyP>
          Couldn&apos;t load workspaces. Please try again.
        </TypographyP>
      </section>
    );
  }

  if (workspaces.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-border bg-card p-6 text-card-foreground">
        <TypographyH4>Your Workspaces</TypographyH4>
        <TypographyP>No workspaces yet. </TypographyP>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6 text-card-foreground">
      <header className="mb-4">
        <TypographyH4>Your Workspaces</TypographyH4>
      </header>

      <ul className="divide-y divide-border">
        {workspaces.map((workspace) => (
          <li key={workspace.id} className="group">
            <Link
              href={`/w/${workspace.id}`}
              className="flex items-center justify-between py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <TypographyMuted className="truncate" as={'div'}>
                {workspace.name}
              </TypographyMuted>
              <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
