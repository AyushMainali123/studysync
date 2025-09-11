'use client';

import { API_BASE_URL } from '@/constants';
import { Button } from '@studysync/ui/components/button';

export function CreateWorkspace() {
  const handleCreateWorkspace = async () => {
    // Call the API to create a workspace
    const response = await fetch(`${API_BASE_URL}/api/workspace`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'New Workspace',
        description: 'Workspace description',
      }),
    });

    if (!response.ok) {
      // Handle error
      console.error('Failed to create workspace');
      return;
    }

    const workspace = await response.json();
    console.log('Created workspace:', workspace);
  };

  return <Button onClick={handleCreateWorkspace}>Create Workspace</Button>;
}
