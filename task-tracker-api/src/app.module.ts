import { Module } from "@nestjs/common";

// modules
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./application/auth/auth.module";
import { UserModule } from "./application/user/user.module";
import { TaskModule } from "./application/task/task.module";

// helpers
import dbConfig, { DbConfig } from "./config/db/db.config";

// entities
import { TaskORMEntity } from "./infrastructure/orm/typeorm/task.orm-entity";
import { UserORMEntity } from "./infrastructure/orm/typeorm/user.orm-entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("SECRET_KEY"),
          signOptions: { expiresIn: "1h" },
        };
      },
      global: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const database = config.get<DbConfig>("database");
        if (!database) {
          throw new Error("database config is not found!");
        }
        return {
          type: "postgres",
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.database,
          entities: [UserORMEntity, TaskORMEntity],
          // this must be disabled for production
          synchronize: true,
          logger: "advanced-console",
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
