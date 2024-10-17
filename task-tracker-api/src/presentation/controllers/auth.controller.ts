import { Body, Controller, Post } from "@nestjs/common";

// service
import { AuthService } from "@/application/auth/auth.service";

// pipes

// dtos
import { SignInDto, SignUpDto } from "../dtos/user.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post("/signup")
  async signUp(@Body() body: SignUpDto) {
    const user = await this.service.signUp(body);
    return user;
  }

  @Post("/sign-in")
  async signIn(@Body() body: SignInDto) {
    const user = await this.service.signIn(body);
    return user;
  }
}
