import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { ShowUserUseCase } from "./ShowUserUseCase";

describe("Show user details", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let showUserUseCase: ShowUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    showUserUseCase = new ShowUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to list all users", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "teste2",
      email: "email2@teste.com",
      password: "12312",
      roles: [],
    });

    const userDetails = await showUserUseCase.execute({ id: user.id });
    expect(userDetails).toHaveProperty("id");
    expect(userDetails.email).toEqual(user.email);
  });
});
