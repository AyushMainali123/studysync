import { prisma } from '@studysync/db';
import { WorkspaceRepository } from '@studysync/repos';
import * as z from 'zod';

export class WorkspaceService {
  private _workspaceRepo: WorkspaceRepository;

  constructor(workspaceRepo: WorkspaceRepository) {
    this._workspaceRepo = workspaceRepo;
  }

  async getUserWorkspaces(input: { userId: string }) {
    const parsed = z
      .object({
        userId: z.cuid(),
      })
      .parse(input);

    const response = await this._workspaceRepo.getUserWorkspace(parsed.userId);
    return response;
  }

  async getUserWorkspaceById(input: { userId: string; workspaceId: string }) {
    const parsed = z
      .object({
        userId: z.cuid(),
        workspaceId: z.cuid(),
      })
      .parse(input);

    const response = await this._workspaceRepo.getUserWorkspaceById(
      parsed.userId,
      parsed.workspaceId
    );
    return response;
  }

  async getWorkspaceMemberById(input: { workspaceId: string }) {
    const parsed = z
      .object({
        workspaceId: z.cuid(),
      })
      .parse(input);

    const response = await this._workspaceRepo.getWorkspaceMembers(
      parsed.workspaceId
    );
    return response;
  }

  async getWorkspaceMemberByUserId(input: {
    workspaceId: string;
    userId: string;
  }) {
    const parsed = z
      .object({
        workspaceId: z.cuid(),
        userId: z.cuid(),
      })
      .parse(input);

    const response = this._workspaceRepo.getUserWorkspaceById(
      parsed.userId,
      parsed.workspaceId
    );
    return response;
  }

  async createWorkspace(input: {
    ownerId: string;
    name: string;
    description: string;
  }) {
    const parsed = z
      .object({
        ownerId: z.cuid(),
        name: z.string().min(2).max(100),
        description: z.string().max(500).optional(),
      })
      .parse(input);

    const txResponse = await prisma.$transaction(async (tx) => {
      const txClient = tx as typeof prisma;
      const workspace = await this._workspaceRepo.createWorkspaceWithClient(
        txClient,
        parsed.name,
        parsed.description || ''
      );
      await this._workspaceRepo.assignUserToWorkspaceWithClient(
        txClient,
        parsed.ownerId,
        workspace.id,
        'admin'
      );

      return workspace;
    });

    return txResponse;
  }
}
