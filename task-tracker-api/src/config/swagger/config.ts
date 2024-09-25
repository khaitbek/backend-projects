import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// types
import type { INestApplication } from '@nestjs/common';

export default function swaggerConfig(app: INestApplication<any>): void {
  const config = new DocumentBuilder()
    .setTitle('Task Tracker API')
    .setDescription('Task Tracker API description')
    .setVersion('1.0')
    .addTag('task-tracker')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
