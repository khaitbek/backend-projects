import { Injectable } from "@nestjs/common";

// services
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

// dtos
import { SignInDto, SignUpDto } from "@/presentation/dtos/auth.dto";
import { BadRequestError, NotFoundError } from "@/shared/helpers/error";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(body: SignUpDto) {
    const isAlreadyExist = await this.userService.getByUsernameOrEmail(
      body.username,
    );
    if (isAlreadyExist) {
      throw new BadRequestError("Username or email already exists!");
    }
    const user = await this.userService.createNew(body);
    return user;
  }

  async signIn(body: SignInDto) {
    const { username, password } = body;

    const user = await this.userService.getByUsernameOrEmail(username);
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    const checkPassword = await this.userService.checkPassword(password, user);

    if (checkPassword === false) {
      throw new BadRequestError("Username or password is incorrect!");
    }

    const jwtPayload = {
      sub: user?.id,
      username: user?.username,
      fullName: `${user?.firstName} ${user?.lastName}`,
    };

    return await this.jwtService.signAsync(jwtPayload);
  }
}
