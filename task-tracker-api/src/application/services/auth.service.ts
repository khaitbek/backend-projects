import { Injectable, NotFoundException } from "@nestjs/common";

// repository
import { AuthRepository } from "@/domain/repositories/auth.repository";

// dtos
import type { CreateUserDto, SignInDto } from "@/presentation/dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) { }
  async signUp(body: CreateUserDto) {
    const user = await this.repository.createUser(body);
    return user;
  }

  async signIn(body: SignInDto) {
    const user = await this.repository.findUserByCredentials({
      username: body.username,
    });
    if (!user) throw new NotFoundException(`Couldn't find a user with the username: ${body.username}`)

    return user;
  }
}
