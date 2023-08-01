import { createConnection } from "typeorm";

import { Permission } from "@modules/accounts/infra/typeorm/entities/Permission";
import { Role } from "@modules/accounts/infra/typeorm/entities/Role";

createConnection()
  .then(async connection => {
    // Criando uma permissão
    const permission = new Permission();
    permission.name = "Permissão 1";
    permission.description = "Descrição da permissão 1";
    await connection.manager.save(permission);

    // Criando uma role
    const role = new Role();
    role.name = "Role 1";
    role.description = "Descrição da role 1";
    role.permission = [permission]; // Vinculando a permissão com a role
    await connection.manager.save(role);

    console.log("Permissão, Role e vinculação criadas com sucesso!");

    await connection.close();
  })
  .catch(error => console.log(error));
