import { Body, Controller, NotFoundException, Post } from "@nestjs/common";

// service
import { AuthService } from "@/application/auth/auth.service";

// dtos
import { SignInDto, SignUpDto } from "../dtos/user.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/sign-up")
  async signUp(@Body() body: SignUpDto) {
    const user = await this.service.signUp(body);
    return user;
  }

  @Post("/sign-in")
  async signIn(@Body() body: SignInDto) {
    try {
      return await this.service.signIn(body);
    } catch (error) {
      return new NotFoundException("Username or password is incorrect!");
    }
  }
}
