import { Controller, Get } from '@nestjs/common';

// services
import { AppService } from '@/application/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
