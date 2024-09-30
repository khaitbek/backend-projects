import { Injectable } from "@nestjs/common";

// repository
import { AuthRepository } from "@/domain/repositories/auth.repository";

// dtos
import type { CreateUserDto, SignInDto } from "@/presentation/dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}
  async signUp(body: CreateUserDto) {
    const user = await this.repository.createUser(body);
    return user;
  }

  async signIn(body: SignInDto) {
    const user = await this.repository.findUserByCredentials({
      username: body.username,
    });
    return user;
  }
}
