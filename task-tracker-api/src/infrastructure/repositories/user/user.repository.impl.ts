import { UserRepository } from "@/domain/repositories/user/user.repository";

export class UserRepositoryImpl implements UserRepository {
  async getUserTasks(id: number): Promise<any[]> {
    return [];
  }
  async getProfile(id: number): Promise<any> {
    return {};
  }
}
