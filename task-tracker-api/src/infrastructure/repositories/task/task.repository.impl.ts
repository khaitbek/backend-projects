import { Task } from "@/domain/entities/task.entity";
import { TaskRepository } from "@/domain/repositories/task/task.repository";

export class TaskRepositoryImpl implements TaskRepository {
  async create(task: Task): Promise<Task> {
    return task;
  }

  async getAll(): Promise<Task[]> {
    return [];
  }

  async getOneById(id: string): Promise<Task> {
    return {} as Task;
  }

  async update(id: Task["id"], task: Partial<Task>): Promise<Task> {
    return {} as Task;
  }
}
