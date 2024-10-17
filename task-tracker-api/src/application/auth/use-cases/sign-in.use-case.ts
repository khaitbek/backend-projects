import { SignInDto } from "../dtos/sign-in.dto";

export async function signIn(dto: SignInDto) {
  const { email, password } = dto;

  return {
    email,
    password,
  };
}
