import { PermissionsRepositoryInMemory } from "@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory";
import { RolesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/RolesRepositoryInMemory";

import { CreatePermissionUseCase } from "../createPermission/CreatePermissionUseCase";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

describe("Create Role", () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory;
  let createRoleUseCase: CreateRoleUseCase;
  let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
  let createPermissionUseCase: CreatePermissionUseCase;

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    createRoleUseCase = new CreateRoleUseCase(
      rolesRepositoryInMemory,
      permissionsRepositoryInMemory,
    );
    createPermissionUseCase = new CreatePermissionUseCase(
      permissionsRepositoryInMemory,
    );
  });

  it("Should be able to create a new role", async () => {
    const permission = await createPermissionUseCase.execute({
      name: "Permissao",
      description: "Permissao descriçao",
    });
    const createdRole = await createRoleUseCase.execute({
      name: "ROLE_USER",
      description: "user",
      permissions: [permission.id],
    });
    console.log(createdRole);
    expect(createdRole).toHaveProperty("id");
  });
});
