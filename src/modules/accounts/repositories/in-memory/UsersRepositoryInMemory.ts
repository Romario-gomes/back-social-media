import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Role } from "../../infra/typeorm/entities/Role";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    email,
    name,
    password,
    roles,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    const passwordHash = await hash(password, 8);
    Object.assign(user, {
      email,
      name,
      password: passwordHash,
      roles,
    });

    // Cria instâncias das entidades Role e atribui ao usuário
    const userRoles = roles.map(role => {
      const userRole = new Role();
      userRole.id = uuidV4(); // Atribua o ID da Role fornecido
      // Atribua outras propriedades da Role, se necessário
      return userRole;
    });

    user.roles = userRoles;

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async findByIdWithRolesAndPermissions(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return null;
    }

    const userWithRolesAndPermissions = { ...user };

    userWithRolesAndPermissions.roles = user.roles.map(role => {
      const roleWithPermissions = { ...role };
      roleWithPermissions.permission = role.permission.map(permission => ({
        ...permission,
      }));
      return roleWithPermissions;
    });

    return userWithRolesAndPermissions;
  }
  async findByEmailWithRolesAndPermissions(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    const userWithRolesAndPermissions = { ...user };

    userWithRolesAndPermissions.roles = user.roles.map(role => {
      const roleWithPermissions = { ...role };
      roleWithPermissions.permission = role.permission.map(permission => ({
        ...permission,
      }));
      return roleWithPermissions;
    });

    return userWithRolesAndPermissions;
  }

  async list(): Promise<User[]> {
    return this.users;
  }
}
export { UsersRepositoryInMemory };
