import { Injectable } from "@nestjs/common";

// repositories
import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user/user.repository";

// helpers
import { hashPassword } from "@/shared/helpers/password";

// dtos
import { NewUserDto } from "@/presentation/dtos/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByUsernameOrEmail(usernameOrEmail: string) {
    const user =
      await this.userRepository.getOneByUsernameOrEmail(usernameOrEmail);

    return user;
  }

  async checkPassword(password: string, user: User) {
    const checkPassword = await this.userRepository.checkUserPassword(
      password,
      user,
    );
    return checkPassword;
  }

  async createNew(dto: NewUserDto) {
    const isAlreadyExist = await this.userRepository.getOneByUsernameOrEmail(
      dto.username,
    );
    if (isAlreadyExist) {
      throw new Error("Username already exists!");
    }
    const hashedPassword = hashPassword(dto.password);
    const user = await this.userRepository.createNew({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }
}
