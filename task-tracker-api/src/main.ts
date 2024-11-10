import { NestFactory } from "@nestjs/core";
import { patchNestJsSwagger } from "nestjs-zod";

// modules
import { AppModule } from "@/app.module";

// config
import swaggerConfig from "@/config/swagger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  patchNestJsSwagger();
  swaggerConfig(app);
  app.enableCors();
  const port = process.env.PORT!;
  await app.listen(port, () => {
    console.log("Application is running on port: ", port);
  });
}
bootstrap();
