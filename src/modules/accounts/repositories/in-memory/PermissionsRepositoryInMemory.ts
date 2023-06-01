import Permission from "../../infra/typeorm/entities/Permission";
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
  findById(id: string): Promise<Permission> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string): Promise<Permission> {
    return this.permissions.find(permission => permission.name === name);
  }
  findByIds(ids: string[]): Promise<Permission[]> {
    throw new Error("Method not implemented.");
  }
}
export { PermissionsRepositoryInMemory };
