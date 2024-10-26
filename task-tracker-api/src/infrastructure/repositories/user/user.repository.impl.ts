import { BadRequestException } from "@nestjs/common";

// entities
import { User } from "@/domain/entities/user.entity";

// repositories
import { UserRepository } from "@/domain/repositories/user/user.repository";

export class UserRepositoryImpl implements UserRepository {
  private readonly users: User[] = [
    {
      id: 1,
      email: "john@gmail.com",
      password: "sfdsfdfdsf",
      username: "john",
      birthDate: "11-03-2005",
      firstName: "John",
      lastName: "Boy",
    },
    {
      id: 2,
      email: "doe@gmail.com",
      password: "sfdsfdfdsf",
      username: "doe",
      birthDate: "11-03-2005",
      firstName: "doe",
      lastName: "susan",
    },
  ];
  async createNew(dto: any) {
    const isDuplicateEmail = await this.getOneByUsernameOrEmail(dto.email);
    if (isDuplicateEmail !== null) {
      throw new BadRequestException(
        `The user with the email ${dto.email} already exists!`,
      );
    }
    const isDuplicateUsername = await this.getOneByUsernameOrEmail(
      dto.username,
    );
    if (isDuplicateUsername !== null) {
      throw new BadRequestException(
        `The user with the username ${dto.username} already exists!`,
      );
    }
    const user: User = {
      id: 3,
      ...dto,
    };
    this.users.push(user);
    return user;
  }

  async getUserTasks(id: number): Promise<any[]> {
    return [];
  }

  async getProfile(id: number): Promise<any> {
    return {};
  }

  async getOneByUsernameOrEmail(usernameOrEmail: string) {
    const user = this.users.find(
      (user) =>
        user.username === usernameOrEmail || user.email === usernameOrEmail,
    );

    if (!user) return null;

    return user;
  }

  async checkUserPassword(password: string, user: User) {
    return password === user.password;
  }
}
