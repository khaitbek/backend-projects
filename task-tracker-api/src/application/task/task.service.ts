import { Injectable } from "@nestjs/common";

// repositories
import { TaskRepository } from "@/domain/repositories/task/task.repository";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAll() {
    return await this.taskRepository.getAll();
  }
}
