import { Task } from "@/domain/entities/task.entity";
import { User } from "@/domain/entities/user.entity";
import { CreateTaskDto } from "@/presentation/dtos/task.dto";

export abstract class TaskRepository {
  getAllByUserId: (userId: User["id"]) => Promise<Task[]>;
  getOneById: (id: Task["id"]) => Promise<Task>;
  create: (task: CreateTaskDto, userId: User["id"]) => Promise<Task>;
  update: (id: Task["id"], task: Partial<Task>) => Promise<Task>;
  delete: (id: Task["id"]) => Promise<boolean>
}
