export const queryKeys = {
  workspaces: {
    all: ['workspaces'],
    byId: (id: string) => ['workspaces', id],
  },
};

export const mutationKeys = {
  workspaces: {
    create: ['workspaces', 'create'],
    update: (id: string) => ['workspaces', id, 'update'],
    delete: (id: string) => ['workspaces', id, 'delete'],
  },
};
