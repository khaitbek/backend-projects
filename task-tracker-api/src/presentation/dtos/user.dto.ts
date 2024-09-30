import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  firstName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
  password: z.string().min(3).max(20),
  email: z.string().email(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const signInSchema = z
  .object({
    username: z.string().min(3).max(20).optional(),
    password: z.string().min(3).max(20).optional(),
  })
  .required();

export type SignInDto = z.infer<typeof signInSchema>;
