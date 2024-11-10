import { Injectable } from "@nestjs/common";

// entities
import type { Task } from "@/domain/entities/task.entity";

// repositories
import { TaskRepository } from "@/domain/repositories/task/task.repository";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAll() {
    return await this.taskRepository.getAll();
  }

  async getOneById(id: Task["id"]) {
    return await this.taskRepository.getOneById(id);
  }

  async create(task: Task) {
    return await this.taskRepository.create(task);
  }

  async update(id: Task["id"], task: Partial<Task>) {
    return await this.taskRepository.update(id, task);
  }
}
