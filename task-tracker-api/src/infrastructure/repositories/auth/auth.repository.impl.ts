import { AuthRepository } from "@/domain/repositories/auth";

export class AuthRepositoryImpl implements AuthRepository {
  async createUser(dto: any) {
    return {};
  }

  async getUserByUsernameOrEmail(dto: any) {
    const user = {
      id: 1,
      email: "mr_no_one@gmail.com",
    };
    return user;
  }
}
