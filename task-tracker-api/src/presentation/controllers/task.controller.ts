import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  // Request,
  UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// guards
import { AuthGuard } from "@/application/auth/auth.guard";

// services
import { TaskService } from "@/application/task/task.service";
import { UpdateTask } from "@/domain/entities/task.entity";
import { CreateTaskDto } from "@/presentation/dtos/task.dto";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("tasks")
@ApiTags("task-controller")
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly service: TaskService) { }

  @Get("/")
  getAllByUserId(@Req() req: Request) {
    const user = req.user as { sub: number };
    return this.service.getAllByUserId(user.sub);
  }

  @Get("/:id")
  getOneById(@Param("id") id: number) {
    return this.service.getOneById(id);
  }

  @Post("/create")
  create(@Body() body: CreateTaskDto, @Req() req: Request) {
    const user = req.user as { sub: number };
    return this.service.create(body, user?.sub);
  }

  @Put("/update/:id")
  update(@Param("id") id: number, @Body() body: UpdateTask) {
    return this.service.update(id, body);
  }

  @Delete("/delete/:id")
  delete(@Param("id") id: number) {
    return this.service.delete(id)
  }
}
