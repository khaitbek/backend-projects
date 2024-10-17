import { Controller, Get } from "@nestjs/common";

// services
import { UserService } from "@/application/user/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get("/tasks")
  getUserTasks() {
    return this.service.getUserTasks({ id: 1 });
  }
}
