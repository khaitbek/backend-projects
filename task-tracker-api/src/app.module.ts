import { Module } from '@nestjs/common';

// controllers
import { AppController } from '@/presentation/controllers/app.controller';

// services
import { AppService } from '@/application/services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
