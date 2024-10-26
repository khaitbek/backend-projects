import { Module } from "@nestjs/common";

// modules
import { AuthModule } from "./application/auth/auth.module";
import { UserModule } from "./application/user/user.module";

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
