import { createConnection } from "typeorm";
import { Permission } from "@modules/accounts/infra/typeorm/entities/Permission";
import { Role } from "@modules/accounts/infra/typeorm/entities/Role";

console.log("Conectando ao banco de dados...");

const seedDatabase = async () => {
  try {
    const connection = await createConnection();
    console.log("Conexão bem-sucedida!");

    await connection.transaction(async transactionalEntityManager => {
    
      const adminPermission = new Permission();
      adminPermission.name = "AdminPermission";
      adminPermission.description = "Descrição da permissão para o administrador";
      await transactionalEntityManager.save(adminPermission);

      const adminRole = new Role();
      adminRole.name = "AdminRole";
      adminRole.description = "Admin Role Description";
      adminRole.permission = [adminPermission];
      await transactionalEntityManager.save(adminRole);
    });

    console.log("Permissão, Role e vinculação criadas com sucesso!");

    await connection.close();
    console.log("Conexão fechada.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
};

seedDatabase();
