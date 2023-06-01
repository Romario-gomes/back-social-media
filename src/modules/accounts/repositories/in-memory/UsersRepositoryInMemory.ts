import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
    });

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  findByIdWithRolesAndPermissions(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByEmailWithRolesAndPermissions(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
export { UsersRepositoryInMemory };
