import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// modules
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./application/auth/auth.module";
import { UserModule } from "./application/user/user.module";
import { dbConfig } from "./config/db/config";
import { TaskORMEntity } from "./infrastructure/orm/typeorm/task.orm-entity";
import { UserORMEntity } from "./infrastructure/orm/typeorm/user.orm-entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [UserORMEntity, TaskORMEntity],
      // this must be disabled for production
      synchronize: true,
      logger: "advanced-console",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
