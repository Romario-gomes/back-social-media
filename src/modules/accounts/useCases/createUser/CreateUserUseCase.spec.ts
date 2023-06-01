import { AppError } from "../../../../shared/errors/AppError";
import { RolesRepositoryInMemory } from "../../repositories/in-memory/RolesRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let rolesRepositoryInMemory: RolesRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      rolesRepositoryInMemory,
    );
  });

  it("should de able to create a new User", async () => {
    const createdUser = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      roles: "12345",
      password: "123456789",
    });
    console.log(createdUser);
    expect(createdUser).toHaveProperty("id");
    expect(createdUser).toMatchObject({
      id: createdUser.id,
      email: "johndoe@email.com",
      name: "John Doe",
    });
  });

  it("Nao deve ser possivel criar usuario com email já existente", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      roles: "12345",
      password: "123456789",
    });

    await expect(
      createUserUseCase.execute({
        name: "John Doe",
        email: "johndoe@email.com",
        roles: "12345",
        password: "123456789",
      }),
    ).rejects.toEqual(new AppError("User already Exists"));
  });
});
