import { UserRepository } from "@/domain/repositories/user/user.repository";
import { SignInDto, SignUpDto } from "@/presentation/dtos/user.dto";
import {
  BadRequestException,
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
    if (!user) {
      new NotFoundException(
        "A user with this username or email does not exist!",
      );
      return;
    }
    const checkPassword = await this.userRepository.checkUserPassword(
      dto.password,
      user,
    );
    if (checkPassword === false) {
      new UnauthorizedException("Username or password is incorrect!");
      return;
    }
    return user;
  }

  async signUp(dto: SignUpDto) {
    const isAlreadyExist = await this.userRepository.getOneByUsernameOrEmail(
      dto.username,
    );
    if (isAlreadyExist) {
      throw new BadRequestException("Username already exists!");
    }
    const user = await this.userRepository.createNew(dto);
    return user;
  }
}
