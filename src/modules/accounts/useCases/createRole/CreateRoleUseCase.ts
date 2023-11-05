import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Role } from "../../infra/typeorm/entities/Role";
import { IRolesRepository } from "../../repositories/IRolesRepository";

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository
  ) {}

  async execute({ name, description }): Promise<Role> {
    const roleAlreadyExits = await this.rolesRepository.findByName(name);

    if (roleAlreadyExits) {
      throw new AppError("Role already Exists", 409);
    }

    const createdRole = await this.rolesRepository.create({
      name,
      description,
    });

    return createdRole;
  }
}

export { CreateRoleUseCase };
