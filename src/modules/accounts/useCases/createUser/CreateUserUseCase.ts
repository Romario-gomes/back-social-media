import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IRolesRepository } from "@modules/accounts/repositories/IRolesRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name, email, role, password }): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already Exists", 409);
    }

    const retrievedRole = await this.rolesRepository.findByName(role);
    
    const passwordHash = await hash(password, 8);
    const userCreated = await this.usersRepository.create({
      name,
      email,
      role: [retrievedRole],
      password: passwordHash,
    });
    
    return userCreated;
  }
}

export { CreateUserUseCase };

