import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { RolesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/RolesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersTokenRepositoryInMemory,
      usersRepositoryInMemory,
      dayjsDateProvider,
    );
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      rolesRepositoryInMemory,
    );
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      email: "user@teste.com",
      password: "1234",
      name: "User Test",
      roles: [],
    };

  it("should not be able to authenticate with invalid token", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "user@teste.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Invalid token."));
  });
    

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });
});
