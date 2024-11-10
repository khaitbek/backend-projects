import { SanitizedUser, User } from "@/domain/entities/user.entity";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class NewUserDto {
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

export const userToSanitizedUser = (user: User): SanitizedUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    birthDate: user.birthDate,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
