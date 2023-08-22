import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveTitleColumn1692622624465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("posts", "title");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "nome_da_sua_tabela",
      new TableColumn({
        name: "title",
        type: "varchar",
      }),
    );
  }
}
