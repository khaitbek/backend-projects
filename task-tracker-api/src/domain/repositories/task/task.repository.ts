import { Task } from "@/domain/entities/task.entity";

export abstract class TaskRepository {
  getAll: () => Promise<Task[]>;
  getOneById: (id: string) => Promise<Task>;
  create: (task: Task) => Promise<Task>;
  update: (id: Task["id"], task: Partial<Task>) => Promise<Task>;
}
