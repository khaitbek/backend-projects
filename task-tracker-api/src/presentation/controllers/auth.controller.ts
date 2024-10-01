import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";

// service
import { AuthService } from "@/application/services/auth.service";

// pipes
import { ValidationPipe } from "@/shared/pipes/validation.pipe";

// dtos
import { CreateUserDto, signUpSchema, SignInDto, signInSchema } from "../dtos/user.dto";


@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post("/signup")
  @UsePipes(new ValidationPipe(signUpSchema))
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.service.signUp(body);
    return user
  }

  @Post("/sign-in")
  @UsePipes(new ValidationPipe(signInSchema))
  async signIn(@Body() body: SignInDto) {
    const user = await this.service.signIn(body)
    return user
  }
}
