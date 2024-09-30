import { Injectable } from '@nestjs/common';

// entities
import { Task } from '@/domain/entities/task.entity';

@Injectable()
export class TaskRepository {
  async getAll() {
    return [];
  }

  getById(id: Task['id']): any {
    return {};
  }

  create(task: any): any {
    return {};
  }

  update(id: Task['id'], task: any): any {
    return {};
  }
}
