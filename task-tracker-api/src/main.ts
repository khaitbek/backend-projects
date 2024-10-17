import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

// modules
import { AppModule } from "@/app.module";

// config
import swaggerConfig from "@/config/swagger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000, () => {
    console.log("Application is running on port 3000");
  });
}
bootstrap();
