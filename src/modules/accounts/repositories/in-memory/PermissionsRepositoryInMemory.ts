import { Permission } from "../../infra/typeorm/entities/Permission";
import { IPermissionsRepository } from "../IPermissionsRepository";

class PermissionsRepositoryInMemory implements IPermissionsRepository {
  permissions: Permission[] = [];

  async create({
    name,
    description,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, {
      name,
      description,
    });

    this.permissions.push(permission);

    return permission;
  }
  async findById(id: string): Promise<Permission> {
    return this.permissions.find(permission => permission.id === id);
  }
  async findByName(name: string): Promise<Permission> {
    return this.permissions.find(permission => permission.name === name);
  }
  async findByIds(ids: string[]): Promise<Permission[]> {
    return this.permissions.filter(permission => ids.includes(permission.id));
  }
}
export { PermissionsRepositoryInMemory };
