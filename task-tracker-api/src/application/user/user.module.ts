import { Module } from "@nestjs/common";

// repositories
import { UserRepository } from "@/domain/repositories/user/user.repository";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user/user.repository.impl";

// services
import { UserService } from "./user.service";

@Module({
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
