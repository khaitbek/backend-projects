import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters!")
    .max(20, "Username must be at most 20 characters!"),
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters!")
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters!")
    .max(20, "Last name must be at most 20 characters!")
    .optional(),
  password: z
    .string({
      required_error: "Password is required!",
    })
    .trim()
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be at most 20 characters!"),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email("Invalid email!"),
  birthDate: z.string().date("Invalid date!").optional(),
});

export class SignUpDto extends createZodDto(signUpSchema) {}

// export const signInSchema = z.object({
//   username: z.string().min(3).max(20).trim(),
//   password: z.string().min(8).max(20).trim(),
// });
export const signInSchema = signUpSchema.pick({
  username: true,
  password: true,
});

export class SignInDto extends createZodDto(signInSchema) {}
