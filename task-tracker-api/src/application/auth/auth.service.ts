import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// services
import { UserService } from "../user/user.service";

// dtos
import { SignInDto, SignUpDto } from "@/presentation/dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(body: SignUpDto) {
    return await this.userService.signUp(body);
  }

  async signIn(body: SignInDto) {
    // const { username, password } = body;
    // const user = await this.userService.({
    //   usernameOrEmail: username
    // });
    // if (user === null) {
    //   throw new Error("Username or password is incorrect!")
    // }
    // if (user.password !== password) {
    //   throw new Error("Username or password is incorrect!")
    // }
    // const jwtPayload = {
    //   sub: user.id,
    //   username: user.username
    // }
    // return {
    //   accessToken: await this.jwtService.signAsync(jwtPayload)
    // }
  }
}
