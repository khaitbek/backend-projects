import { Module } from "@nestjs/common";

// controllers
import { AppController } from "@/presentation/controllers/app.controller";
import { TaskController } from "@/presentation/controllers/task.controller";
import { AuthController } from "./presentation/controllers/auth.controller";

// services
import { AppService } from "@/application/services/app.service";
import { TaskService } from "@/application/services/task.service";
import { AuthService } from "./application/services/auth.service";

// repositories
import { AppRepository } from "./domain/repositories/app.repository";
import { AuthRepository } from "./domain/repositories/auth.repository";
import { TaskRepository } from "./domain/repositories/task.repository";

@Module({
  imports: [],
  controllers: [AppController, TaskController, AuthController],
  providers: [
    AppService,
    AppRepository,
    TaskService,
    TaskRepository,
    AuthService,
    AuthRepository,
  ],
})
export class AppModule {}
