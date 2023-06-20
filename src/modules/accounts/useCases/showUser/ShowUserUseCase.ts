import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import auth from "@config/auth";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

interface IPayLoad {
  email: string;
}

@injectable()
class ShowUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const user = this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not exists");
    }

    return user;
  }
}

export { ShowUserUseCase };
