import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRaidsTable1571021176551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'raids',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true
      },{
        name: 'raid_id',
        type: 'varchar(64)'
      },{
        name: 'raw',
        type: 'text'
      },{
        name: 'parsed',
        type: 'jsonb'
      }]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('raids');
  }
}
