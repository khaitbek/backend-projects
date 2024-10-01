import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { intersection, z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  firstName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
  password: z.string().min(3).max(20),
  email: z.string().email(),
});

export class CreateUserDto {
  @ApiProperty({
    title: "Username",
    example: "john",
    required: true
  })
  username: string;

  @ApiProperty({
    title: "Email",
    example: "john@gmail.com"
  })
  email: string;

  @ApiProperty({
    title: "First name",
    example: "John"
  })
  firstName: string;

  @ApiProperty({
    title: "Last name",
    example: "Doe"
  })
  lastName: string;

  @ApiProperty({
    title: "Password",
    minLength: 8,
    maxLength: 32
  })
  password: string;
}

export const signInSchema = z
  .object({
    username: z.string().min(3).max(20).optional(),
    password: z.string().min(3).max(20).optional(),
  })
  .required();

export class SignInDto {
  @ApiProperty({
    title: "Username",
    example: "john",
    required: true
  })
  username: string;

  @ApiProperty({
    title: "Password",
    minLength: 8,
    maxLength: 32
  })
  password: string;
} 
