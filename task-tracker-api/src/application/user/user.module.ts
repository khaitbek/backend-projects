import { Module } from "@nestjs/common";

// repositories
import { UserRepository } from "@/domain/repositories/user/user.repository";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user/user.repository.impl";

// services
import { UserORMEntity } from "@/infrastructure/orm/typeorm/user.orm-entity";
import { UserController } from "@/presentation/controllers/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserORMEntity])],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
