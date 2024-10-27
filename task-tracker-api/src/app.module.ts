import { Module } from "@nestjs/common";

// modules
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./application/auth/auth.module";
import { UserModule } from "./application/user/user.module";
import { dbConfig } from "./config/db/config";
import { UserORMEntity } from "./infrastructure/orm/typeorm/user.orm-entity";

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [UserORMEntity],
      // this must be disabled for production
      synchronize: true,
      logger: "advanced-console",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
