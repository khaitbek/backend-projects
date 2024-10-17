import { SignUpDto } from "../dtos/sign-up.dto";

export async function signUp(dto: SignUpDto) {
  const { email, password } = dto;
  return {
    email,
    password,
  };
}
