import { hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import auth from "../../../../config/auth";

interface IRequest {
  token: string;
  password: string;
}

interface IPayLoad {
  sub: string;
  email: string;
}

@injectable()
class UpdatePasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<User> {
    const { email } = verify(token, auth.secret_token) as IPayLoad;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not exists", 404);
    }

    user.password = await hash(password, 8);

    const updatedUserPassword = await this.usersRepository.create(user);

    return updatedUserPassword;
  }
}

export { UpdatePasswordUseCase };
