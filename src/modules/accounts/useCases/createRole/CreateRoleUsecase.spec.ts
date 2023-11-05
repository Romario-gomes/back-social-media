import { RolesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/RolesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRoleUseCase } from "./CreateRoleUseCase";

describe("Create Role", () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory;
  let createRoleUseCase: CreateRoleUseCase;

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    createRoleUseCase = new CreateRoleUseCase(
      rolesRepositoryInMemory,
    );
  });

  it("Should be able to create a new role", async () => {
    const createdRole = await createRoleUseCase.execute({
      name: "ROLE_USER",
      description: "user",
    });
    expect(createdRole).toHaveProperty("id");
  });

  it("Should not be able to create a new Role with name already exists", async () => {
    await createRoleUseCase.execute({
      name: "ROLE_USER",
      description: "user",
    });

    await expect(
      createRoleUseCase.execute({
        name: "ROLE_USER",
        description: "user",
      }),
    ).rejects.toEqual(new AppError("Role already Exists"));
  });
});
