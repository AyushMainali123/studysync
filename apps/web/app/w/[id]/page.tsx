import { API_BASE_URL } from '@/constants';
import { DBWorkspace } from '@studysync/types';
import { TypographyH1, TypographyP } from '@studysync/ui/components/typography';
import Create from './_components/create';

interface IWorkspacePageProps {
  params: Promise<Record<string, string>>;
}

export default async function WorkspacePage(props: IWorkspacePageProps) {
  const workspaceId = (await props.params).id as string;
  const responseRaw = await fetch(
    `${API_BASE_URL}/api/workspace/${workspaceId}`
  );
  const response = (await responseRaw.json()) as DBWorkspace;

  return (
    <div>
      <TypographyH1>{response.name}</TypographyH1>
      <TypographyP>{response.description}</TypographyP>
      <div>
        <Create workspaceId={workspaceId} parentId={null} />
      </div>
    </div>
  );
}
