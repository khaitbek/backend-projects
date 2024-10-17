import { AuthRepository } from "@/domain/repositories/auth";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth/auth.repository.impl";
import { AuthController } from "@/presentation/controllers/auth.controller";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Module({
  providers: [
    AuthService,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ],

  controllers: [AuthController],
})
export class AuthModule { }
