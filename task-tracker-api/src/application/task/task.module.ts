import { Module } from "@nestjs/common";

// modules
import { TypeOrmModule } from "@nestjs/typeorm";

// services
import { TaskService } from "./task.service";

// controllers
import { TaskRepository } from "@/domain/repositories/task/task.repository";
import { TaskORMEntity } from "@/infrastructure/orm/typeorm/task.orm-entity";
import { TaskRepositoryImpl } from "@/infrastructure/repositories/task/task.repository.impl";
import { TaskController } from "@/presentation/controllers/task.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TaskORMEntity])],
  providers: [
    TaskService,
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl,
    },
  ],
  controllers: [TaskController],
})
export class TaskModule {}
