import { Injectable } from "@nestjs/common";

// repository

// dtos

@Injectable()
export class AuthService {
  // constructor(private readonly repository: AuthRepository) {}
  async signUp(body: any) {
    // return await this.repository.createUser(body);
  }

  async signIn(body: any) {
    const { usernameOrEmail } = body;
    // const user =
    // await this.repository.getUserByUsernameOrEmail(usernameOrEmail);
    // if (!user) {
    //   throw new Error("User not found");
    // }
    // return user;
  }
}
