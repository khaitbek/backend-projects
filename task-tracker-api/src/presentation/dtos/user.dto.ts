import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  username: string;


  firstName?: string;
  lastName?: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;

  birthDate?: string;
}

export class SignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
