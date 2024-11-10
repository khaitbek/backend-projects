import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// services
import { UserService } from "@/application/user/user.service";

@Controller("user")
@ApiTags("user-controller")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get("/tasks")
  getUserTasks() {
    return [];
    // return this.service.getUserTasks({ id: 1 });
  }
}
