import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
