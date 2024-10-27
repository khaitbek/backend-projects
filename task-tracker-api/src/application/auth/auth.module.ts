import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

// controllers
import { AuthController } from "@/presentation/controllers/auth.controller";

// modules
import { UserModule } from "../user/user.module";

// services
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: "1h" },
    }),
    UserModule,
  ],
  providers: [AuthService],

  controllers: [AuthController],
})
export class AuthModule {}
