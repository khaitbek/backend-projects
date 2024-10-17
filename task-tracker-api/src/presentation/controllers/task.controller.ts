import { Controller, Get } from "@nestjs/common";

// services
import { TaskService } from "@/application/task/task.service";

@Controller("task")
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get("/all")
  getAll() {
    return this.service.getAll();
  }
}
