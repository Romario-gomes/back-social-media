import { createConnection } from "typeorm";
import { Role } from "@modules/accounts/infra/typeorm/entities/Role";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { v4 as uuidV4 } from "uuid";

console.log("Conectando ao banco de dados...");

const seedDatabase = async () => {
  try {
    const connection = await createConnection();
    console.log("Connection ok");

    await connection.transaction(async transactionalEntityManager => {

      const adminRole = new Role();
      adminRole.name = "admin";
      adminRole.description = "Create, Read, Update, Delete fully";

      const adminUser = new User();
      adminUser.id == uuidV4()
      adminUser.created_at = new Date(Date.now())
      adminUser.name = "admin"
      adminUser.roles = adminRole
      adminUser.email = "admin@gmail.com"
      adminUser.password = "123Admin@"

      await Promise.all([transactionalEntityManager.save(adminRole), transactionalEntityManager.save(adminUser)])
    });

    console.log("User admin create with succefully");

    await connection.close();
    console.log("Close connection");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
};

seedDatabase();
