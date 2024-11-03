import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// service
import { AuthService } from "@/application/auth/auth.service";

// dtos
import { SignInDto, SignUpDto } from "../dtos/user.dto";

@Controller("/auth")
@ApiTags("auth-controller")
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
      console.log(error);
      return new NotImplementedException("Unexpected error");
    }
  }
}
