import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { ListUsersUseCase } from "./ListUsersUseCase";

describe("List Users", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let listUsersUseCase: ListUsersUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("Should be able to list all users", async () => {
    await usersRepositoryInMemory.create({
      name: "teste",
      email: "email@teste.com",
      password: "12312",
      roles: [],
    });

    await usersRepositoryInMemory.create({
      name: "teste2",
      email: "email2@teste.com",
      password: "12312",
      roles: [],
    });

    const users = await listUsersUseCase.execute();
    expect(users).toHaveLength(2);
  });
});
