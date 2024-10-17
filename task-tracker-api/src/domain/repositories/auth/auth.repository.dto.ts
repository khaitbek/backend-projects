interface GetUserByUsernameOrEmailDto {
  usernameOrEmail: string;
}

interface CreateUserDto {
  email: string;
  password: string;
}

export interface AuthRepositoryDto {
  getUserByUsernameOrEmail: GetUserByUsernameOrEmailDto;
  createUser: CreateUserDto;
}
