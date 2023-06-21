import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersTokenRepositoryInMemory,
      usersRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      email: "user@teste.com",
      password: "1234",
      name: "User Test",
      roles: [],
    };

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate with invalid token", async () => {
    const user = {
      email: "user@teste.com",
      password: "1234",
      name: "User Test",
      roles: [],
    };

    await usersRepositoryInMemory.create(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "user@teste.com",
        password: "1233",
      }),
    ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
  });
});
