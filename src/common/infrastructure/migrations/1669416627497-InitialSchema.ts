import { SqlReader } from 'node-sql-reader';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1669416627497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const folder = __dirname;
    const path = folder + '/initial-schema.sql';
    const queries = SqlReader.readSqlFile(path);
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
