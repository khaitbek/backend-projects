import { User } from "@/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class UserRepository {
  getUserTasks: (id: User["id"]) => Promise<any[]>;
  getProfile: (id: User["id"]) => Promise<any>;
  getOneByUsernameOrEmail: (usernameOrEmail: string) => Promise<User | null>;
  checkUserPassword: (
    passwordToBeChecked: string,
    user: User,
  ) => Promise<boolean>;
  createNew: (dto: any) => Promise<User>;
}
