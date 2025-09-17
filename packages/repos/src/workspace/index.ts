import { WorkspaceMemberRole } from '@studysync/db';
import { BaseRepository } from '../base';
import { DBWorkspace } from '@studysync/types';

interface IWorkspaceRepository {}

export class WorkspaceRepository
  extends BaseRepository
  implements IWorkspaceRepository
{
  async getUserWorkspace(userId: string): Promise<DBWorkspace[]> {
    return this.prisma.workspace.findMany({
      where: { members: { some: { userId } } },
    });
  }

  async getUserWorkspaceById(
    userId: string,
    workspaceId: string
  ): Promise<DBWorkspace | null> {
    return this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });
  }

  async createWorkspaceWithClient(
    client: typeof this.prisma,
    name: string,
    description: string
  ): Promise<DBWorkspace> {
    return client.workspace.create({
      data: {
        name,
        description,
      },
    });
  }

  async createWorkspace(
    name: string,
    description: string
  ): Promise<DBWorkspace> {
    return this.createWorkspaceWithClient(this.prisma, name, description);
  }

  async assignUserToWorkspaceWithClient(
    client: typeof this.prisma,
    userId: string,
    workspaceId: string,
    role?: WorkspaceMemberRole
  ) {
    return client.workspaceMember.create({
      data: {
        user: { connect: { id: userId } },
        workspace: { connect: { id: workspaceId } },
        role: role || WorkspaceMemberRole.viewer,
      },
    });
  }

  async assignUserToWorkspace(
    userId: string,
    workspaceId: string,
    role?: WorkspaceMemberRole
  ) {
    return this.assignUserToWorkspaceWithClient(
      this.prisma,
      userId,
      workspaceId,
      role
    );
  }

  async getWorkspaceMembers(workspaceId: string) {
    return this.prisma.workspaceMember.findMany({
      where: {
        workspaceId,
      },
      include: {
        user: true,
      },
    });
  }

  async getWorkspaceMemberByUserId(userId: string, workspaceId: string) {
    return this.prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
    });
  }
}
