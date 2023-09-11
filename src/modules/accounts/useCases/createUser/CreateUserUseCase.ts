import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IRolesRepository } from "@modules/accounts/repositories/IRolesRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name, email, roles, password }): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    console.log("Chegou aqui");
    if (userAlreadyExists) {
      throw new AppError("User already Exists", 409);
    }

    const existsRole = await this.rolesRepository.findByIds(roles)[0];
    const passwordHash = await hash(password, 8);
    const userCreated = await this.usersRepository.create({
      name,
      email,
      role: existsRole,
      password: passwordHash,
    });

    return userCreated;
  }
}

export { CreateUserUseCase };

