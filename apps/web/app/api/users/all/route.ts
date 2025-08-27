import { ServiceFactory } from '@/lib/factory/service-factory';

export async function GET() {
  const userService = ServiceFactory.userService();
  const users = await userService.getAllUsers();
  return Response.json({ users });
}
