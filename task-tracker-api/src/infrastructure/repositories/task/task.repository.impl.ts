import { InjectRepository } from "@nestjs/typeorm";
import { Repository, } from "typeorm";

// entities
import { Task } from "@/domain/entities/task.entity";
import { User } from "@/domain/entities/user.entity";
import { TaskORMEntity } from "@/infrastructure/orm/typeorm/task.orm-entity";

// repositories
import { TaskRepository } from "@/domain/repositories/task/task.repository";

// dtos
import { CreateTaskDto } from "@/presentation/dtos/task.dto";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskORMEntity)
    private readonly repository: Repository<TaskORMEntity>,
  ) { }

  async create(task: CreateTaskDto, userId: User["id"]): Promise<Task> {
    const newTask = this.repository.create({
      ...task,
      createdBy: userId
    });
    await this.repository.save(newTask);
    return newTask;
  }

  async getAllByUserId(userId: User["id"]): Promise<Task[]> {
    const tasks = await this.repository.createQueryBuilder("task").where("task.createdBy = :userId", {
      userId
    }).getMany();
    return tasks;
  }

  async getOneById(taskId: Task["id"]): Promise<Task> {
    const task = await this.repository.findOneBy({ id: taskId });
    if (!task) throw new Error("Task not found");
    return task;
  }

  async update(id: Task["id"], updatedFields: Partial<Task>): Promise<Task> {
    const task = await this.getOneById(id);
    await this.repository.update({ id }, { ...updatedFields })
    return {
      ...task,
      ...updatedFields
    };
  }

  async delete(id: Task["id"]): Promise<boolean> {
    await this.getOneById(id);
    const deletedTask = await this.repository.delete({ id })
    if (deletedTask.affected === null || deletedTask.affected === undefined) {
      return false;
    }
    return true;
  }
}
