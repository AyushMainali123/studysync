import { UserRepository } from '@studysync/repos';

export class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  async getAllUsers() {
    return this.repo.findAll();
  }
}
