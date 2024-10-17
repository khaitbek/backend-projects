import { UserRepository } from "@/domain/repositories/user/user.repository";
import { Injectable } from "@nestjs/common";
import { GetUserTasksDto } from "./dtos/get-user-tasks.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserTasks(dto: GetUserTasksDto) {
    return await this.userRepository.getUserTasks(dto.id);
  }
}
