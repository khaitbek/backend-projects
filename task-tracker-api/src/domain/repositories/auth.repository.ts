import { Injectable, NotFoundException } from "@nestjs/common";

// dto
import type { CreateUserDto } from "@/presentation/dtos/user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthRepository {
  private readonly users: User[] = []

  async createUser(dto: CreateUserDto) {
    const user = {
      ...dto,
      id: Math.random() * 100000
    };
    this.users.push(user)

    return {
      user,
      token: "jwt_token"
    };
  }

  async findUserByCredentials({ username }: { username: string }) {
    const user = this.users.find(user => user.username === username);
    if (!user) return null

    return user

  }
}
