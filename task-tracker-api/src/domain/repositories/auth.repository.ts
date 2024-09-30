import { Injectable } from "@nestjs/common";

// dto
import type { CreateUserDto } from "@/presentation/dtos/user.dto";

@Injectable()
export class AuthRepository {
  async createUser(dto: CreateUserDto) {
    const user = {
      ...dto,
    };
    return {
      user,
    };
  }

  async findUserByCredentials({ username }: { username: string }) {
    const user = {
      username,
    };
    return {
      user,
    };
  }
}
