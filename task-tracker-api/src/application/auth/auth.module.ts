import { Module } from "@nestjs/common";

// controllers
import { AuthController } from "@/presentation/controllers/auth.controller";

// modules
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";

// services
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("SECRET_KEY"),
          signOptions: { expiresIn: "1h" },
        };
      },
    }),
    UserModule,
  ],
  providers: [AuthService],

  controllers: [AuthController],
})
export class AuthModule {}
