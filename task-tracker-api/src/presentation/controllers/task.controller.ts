import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// guards
import { AuthGuard } from "@/application/auth/auth.guard";

// services
import { TaskService } from "@/application/task/task.service";
import { Task } from "@/domain/entities/task.entity";

@UseGuards(AuthGuard)
@Controller("tasks")
@ApiTags("task-controller")
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get("/")
  getAll() {
    return this.service.getAll();
  }

  @Get("/:id")
  getOneById(id: Task["id"]) {
    return this.service.getOneById(id);
  }

  @Post("/create")
  create(@Body() body: Task) {
    return this.service.create(body);
  }

  @Put("/update/:id")
  update(@Param("id") id: Task["id"], @Body() body: Task) {
    return this.service.update(id, body);
  }
}
