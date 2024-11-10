import { Module } from "@nestjs/common";

// controllers
import { AuthController } from "@/presentation/controllers/auth.controller";

// modules
import { UserModule } from "../user/user.module";

// services
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule],
  providers: [AuthService],

  controllers: [AuthController],
})
export class AuthModule {}
