import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    role,
    avatar,
    id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      role: [role],
      avatar,
      id,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id, {
      relations: ["roles", "roles.permissions"]
    });
    return user;
  }

  async findByIdWithRolesAndPermissions(id: string): Promise<User> {
    const user = await this.repository.findOne(id, {
      relations: ["roles", "roles.permission"],
    });

    return user;
  }

  async findByEmailWithRolesAndPermissions(email: string): Promise<User> {
    const user = await this.repository.findOne(
      { email },
      {
        relations: ["roles", "roles.permission"],
      },
    );

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { UsersRepository };

