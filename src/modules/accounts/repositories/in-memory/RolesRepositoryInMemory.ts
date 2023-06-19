import { ICreateRoleDTO } from "../../dtos/ICreateRoleDTO";
import { Role } from "../../infra/typeorm/entities/Role";
import { IRolesRepository } from "../IRolesRepository";

class RolesRepositoryInMemory implements IRolesRepository {
  roles: Role[] = [];
  async create({
    name,
    description,
    permissions,
  }: ICreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, {
      name,
      description,
      permissions,
    });

    this.roles.push(role);
    return role;
  }

  async findById(id: string): Promise<Role> {
    return this.roles.find(roles => roles.id === id);
  }
  async findByName(name: string): Promise<Role> {
    return this.roles.find(roles => roles.name === name);
  }
  async findByIds(ids: string[]): Promise<Role[]> {
    return this.roles.filter(roles => {
      return ids.includes(roles.id);
    });
  }
}

export { RolesRepositoryInMemory };
