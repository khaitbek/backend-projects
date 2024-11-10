import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

// entities
import type { SanitizedUser, User } from "@/domain/entities/user.entity";
import { UserORMEntity } from "@/infrastructure/orm/typeorm/user.orm-entity";

// repositories
import { UserRepository } from "@/domain/repositories/user/user.repository";

// dtos
import type { SignUpDto } from "@/presentation/dtos/auth.dto";

// helpers
import { userToSanitizedUser } from "@/presentation/dtos/user.dto";
import { comparePassword } from "@/shared/helpers/password";

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserORMEntity)
    private readonly repository: Repository<UserORMEntity>,
    // private readonly tasksRepository: Repository<TaskORMEntity>,
  ) {}

  async createNew(dto: SignUpDto): Promise<SanitizedUser> {
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

    const user = await this.repository.save(dto);

    return userToSanitizedUser(user);
  }

  // async getUserTasks(id: number): Promise<any[]> {
  //   const user = await this.repository.findOneBy({ id });
  //   if (!user) throw new Error("User not found");
  //   const tasks = await this.tasksRepository.find({
  //     where: {
  //       createdBy: user.id,
  //     },
  //   });
  //   return tasks;
  // }

  async getProfile(id: number): Promise<any> {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new Error("User not found");
    return userToSanitizedUser(user);
  }

  async getOneByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    const userByEmail = await this.repository.findOneBy({
      email: usernameOrEmail,
    });
    if (userByEmail) return userByEmail;

    const userByUsername = await this.repository.findOneBy({
      username: usernameOrEmail,
    });
    if (userByUsername) return userByUsername;

    return null;
  }

  async checkUserPassword(password: string, user: User): Promise<boolean> {
    return comparePassword(password, user.password);
  }
}
