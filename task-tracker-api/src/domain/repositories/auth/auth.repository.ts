import { Injectable } from "@nestjs/common";
import { AuthRepositoryDto } from "./auth.repository.dto";

@Injectable()
export class AuthRepository {
  getUserByUsernameOrEmail: (
    dto: AuthRepositoryDto["getUserByUsernameOrEmail"],
  ) => Promise<any>;
  createUser: (dto: AuthRepositoryDto["createUser"]) => Promise<any>;
}
