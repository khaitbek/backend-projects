import { UserRepository } from "@/domain/repositories/user/user.repository";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user/user.repository.impl";
import { Module } from "@nestjs/common";
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
