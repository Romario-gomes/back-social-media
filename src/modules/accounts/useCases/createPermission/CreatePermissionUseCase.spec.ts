import { AppError } from "../../../../shared/errors/AppError";
import { PermissionsRepositoryInMemory } from "../../repositories/in-memory/PermissionsRepositoryInMemory";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

describe("Create Permission", () => {
  let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
  let createPermissionUseCase: CreatePermissionUseCase;

  beforeEach(() => {
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    createPermissionUseCase = new CreatePermissionUseCase(
      permissionsRepositoryInMemory,
    );
  });

  it("deve ser possivel criar uma permissao", async () => {
    const createdPermission = await createPermissionUseCase.execute({
      name: "Permissão teste",
      description: "Descrição teste",
    });
    console.log(createdPermission);

    expect(createdPermission).toHaveProperty("id");
    expect(createdPermission).toMatchObject({
      id: createdPermission.id,
      name: "Permissão teste",
      description: "Descrição teste",
    });
  });

  it("não deve ser possível criar permissão com nome já existente", async () => {
    await createPermissionUseCase.execute({
      name: "Permissão teste",
      description: "Descrição teste",
    });

    await expect(
      createPermissionUseCase.execute({
        name: "Permissão teste",
        description: "Descrição teste",
      }),
    ).rejects.toEqual(new AppError("Permissão já existente"));
  });
});
