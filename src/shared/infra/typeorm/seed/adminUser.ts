import { createConnection } from "typeorm";
import { Permission } from "@modules/accounts/infra/typeorm/entities/Permission";
import { Role } from "@modules/accounts/infra/typeorm/entities/Role";

console.log("Conectando ao banco de dados...");

const seedDatabase = async () => {
  try {
    const connection = await createConnection();
    console.log("Connection ok");

    await connection.transaction(async transactionalEntityManager => {

      const adminRole = new Role();
      adminRole.name = "admin";
      adminRole.description = "Admin Role Description";
      await transactionalEntityManager.save(adminRole);
    });

    console.log("User admin create with succefully");

    await connection.close();
    console.log("Close connection");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
};

seedDatabase();
