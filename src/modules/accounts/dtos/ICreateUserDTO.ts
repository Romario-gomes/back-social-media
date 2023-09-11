import { Role } from "../infra/typeorm/entities/Role";

interface ICreateUserDTO {
  name: string;
  password: string;
  username?: string;
  email: string;
  role?: Role;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };

