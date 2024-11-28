import { Injectable } from "@nestjs/common";

// entities
import type { Task } from "@/domain/entities/task.entity";
import type { User } from "@/domain/entities/user.entity";

// repositories
import { TaskRepository } from "@/domain/repositories/task/task.repository";
import { CreateTaskDto } from "@/presentation/dtos/task.dto";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) { }

  async getAllByUserId(userId: User["id"]) {
    return await this.taskRepository.getAllByUserId(userId);
  }

  async getOneById(id: Task["id"]) {
    return await this.taskRepository.getOneById(id);
  }

  async create(task: CreateTaskDto, userId: User["id"]) {
    return await this.taskRepository.create(task, userId);
  }

  async update(id: Task["id"], task: Partial<Task>) {
    return await this.taskRepository.update(id, task);
  }

  async delete(id: Task["id"]) {
    return await this.taskRepository.delete(id);
  }
}
