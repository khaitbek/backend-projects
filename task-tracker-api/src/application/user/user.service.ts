import { UserRepository } from "@/domain/repositories/user/user.repository";
import { SignInDto, SignUpDto } from "@/presentation/dtos/user.dto";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { GetUserTasksDto } from "./dtos/get-user-tasks.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserTasks(dto: GetUserTasksDto) {
    return await this.userRepository.getUserTasks(dto.id);
  }

  async signIn(dto: SignInDto) {
    const user = await this.userRepository.getOneByUsernameOrEmail(
      dto.username,
    );
    if (!user)
      return new NotFoundException("Username or password is incorrect!");
    const checkPassword = await this.userRepository.checkUserPassword(
      dto.password,
      user,
    );
    if (checkPassword === false) {
      return new UnauthorizedException("Username or password is incorrect!");
    }
    return user;
  }

  async signUp(dto: SignUpDto) {
    return await this.userRepository.getOneByUsernameOrEmail(dto.username);
  }
}
