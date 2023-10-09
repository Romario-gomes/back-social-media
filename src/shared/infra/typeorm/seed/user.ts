import { createConnection } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { Permission } from "../../../../modules/accounts/infra/typeorm/entities/Permission";
import { Role } from "../../../../modules/accounts/infra/typeorm/entities/Role";

createConnection()
  .then(async connection => {
    // Criando uma permissão
    const permission = new Permission();
    permission.name = "Pode fazer tudo";
    permission.description = "administrador do sistema";
    await connection.manager.save(permission);

    // Criando uma role
    const role = new Role();
    role.name = "admin";
    role.description = "admin";
    role.permission = [permission]; // Vinculando a permissão com a role
    await connection.manager.save(role);

    const userAdmin = new User();
    userAdmin.name = "admin";
    userAdmin.email = "UserAdmin@hotmail.com";
    userAdmin.password = "12345678";
    userAdmin.avatar = "img.jpg";
    userAdmin.roles = [role];
    await connection.manager.save(userAdmin);

    const permissionUser = new Permission();
    permissionUser.name = "User padrao";
    permissionUser.description = "Usuário padrão";
    await connection.manager.save(permissionUser);

    // Criando uma role
    const roleUser = new Role();
    roleUser.name = "User";
    roleUser.description = "User";
    roleUser.permission = [permission]; // Vinculando a permissão com a role
    await connection.manager.save(roleUser);

    const user = new User();
    user.name = "Usuário comum";
    user.email = "comumUser@hotmail.com";
    user.password = "12345678";
    user.avatar = "img.jpg";
    user.roles = [roleUser];
    await connection.manager.save(user);

    console.log(
      "Permissão, Role, usuário comum, adm e vinculação criadas com sucesso!",
    );

    await connection.close();
  })
  .catch(error => console.log(error));
