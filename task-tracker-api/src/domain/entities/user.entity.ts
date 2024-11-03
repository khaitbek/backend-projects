import { ApiProperty } from "@nestjs/swagger";

export class User {
  id: number;
  @ApiProperty({
    description: "A unique username",
    example: "mr_no_one",
    required: true,
  })
  username: string;
  email: string;
  password: string;
  birthDate?: string;
  firstName?: string;
  lastName?: string;
}

export interface SanitizedUser extends Omit<User, "password"> {}
