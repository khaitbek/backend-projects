// entities
import { Task } from "@/domain/entities/task.entity";

// repositories
import { TaskRepository } from "@/domain/repositories/task/task.repository";
import { TaskORMEntity } from "@/infrastructure/orm/typeorm/task.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskORMEntity)
    private readonly repository: Repository<TaskORMEntity>,
  ) {}

  async create(task: Task): Promise<Task> {
    const newTask = this.repository.create({
      ...task,
    });
    await this.repository.save(newTask);
    return newTask;
  }

  async getAll(): Promise<Task[]> {
    return [];
  }

  async getOneById(taskId: Task["id"]): Promise<Task> {
    const task = await this.repository.findOneBy({ id: taskId });
    if (!task) throw new Error("Task not found");
    return task;
  }

  async update(id: Task["id"], task: Partial<Task>): Promise<Task> {
    // const task = await this.getOneById(id);
    // await this.repository.update()
    return {} as Task;
  }
}
