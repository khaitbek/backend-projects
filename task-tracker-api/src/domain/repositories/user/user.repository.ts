import { User } from "@/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class UserRepository {
  getUserTasks: (id: User["id"]) => Promise<any[]>;
  getProfile: (id: User["id"]) => Promise<any>;
}
