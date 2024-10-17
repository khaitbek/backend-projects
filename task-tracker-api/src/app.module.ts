import { Module } from "@nestjs/common";

// modules
import { AuthModule } from "./application/auth";

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
