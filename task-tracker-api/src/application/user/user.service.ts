import { UserRepository } from "@/domain/repositories/user/user.repository";
import { SignInDto, SignUpDto } from "@/presentation/dtos/user.dto";
import { hashPassword } from "@/shared/helpers/password";
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
    if (user == null || user === undefined) {
      throw new NotFoundException(
        "A user with this username or email does not exist!",
      );
    }
    const checkPassword = await this.userRepository.checkUserPassword(
      dto.password,
      user!,
    );
    if (checkPassword === false) {
      throw new UnauthorizedException("Username or password is incorrect!");
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
    const hashedPassword = hashPassword(dto.password);
    const user = await this.userRepository.createNew({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }
}
