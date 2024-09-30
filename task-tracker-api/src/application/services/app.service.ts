import { Injectable } from '@nestjs/common';

// repositories
import { AppRepository } from '@/domain/repositories/app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  async getHello() {
    return await this.appRepository.getHello();
  }
}
