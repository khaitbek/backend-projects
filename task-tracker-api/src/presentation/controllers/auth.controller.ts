import { Body, Controller, Post, UsePipes } from "@nestjs/common";

// service
import { AuthService } from "@/application/services/auth.service";

// pipes
import { ValidationPipe } from "@/shared/pipes/validation.pipe";

// dtos
import { type CreateUserDto, createUserSchema } from "../dtos/user.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/signup")
  @UsePipes(new ValidationPipe(createUserSchema))
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.service.signUp(body);
    return {
      user,
    };
  }
}
