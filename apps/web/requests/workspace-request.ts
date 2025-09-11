import { API_BASE_URL } from '@/constants';
import { DBWorkspace } from '@studysync/types';

export class WorkspaceRequest {
  static async getUserWorkspaces() {
    const workspacesRaw = await fetch(`${API_BASE_URL}/api/workspace`);
    const workspaces = (await workspacesRaw.json()) as {
      workspaces: DBWorkspace[];
    };

    return workspaces.workspaces;
  }
}
