import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// service
import { AuthService } from "@/application/auth/auth.service";

// dtos
import { BaseError } from "@/shared/helpers/error";
import { SuccessResponse } from "@/shared/helpers/response";
import { ValidationPipe } from "@/shared/pipes/validation.pipe";
import {
  SignInDto,
  signInSchema,
  SignUpDto,
  signUpSchema,
} from "../dtos/auth.dto";

@Controller("/auth")
@ApiTags("auth-controller")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/sign-up")
  @UsePipes(new ValidationPipe(signUpSchema))
  async signUp(@Body() body: SignUpDto) {
    try {
      const user = await this.service.signUp(body);
      return user;
    } catch (err) {
      const error = err as BaseError<unknown>;
      return new HttpException(error.message, error.statusCode);
    }
  }

  @Post("/sign-in")
  @UsePipes(new ValidationPipe(signInSchema))
  async signIn(@Body() body: SignInDto) {
    try {
      const response = await this.service.signIn(body);
      return new SuccessResponse(response);
    } catch (err) {
      const error = err as BaseError<unknown>;
      return new HttpException(error.message, error.statusCode);
    }
  }
}
