import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
const TABLE_NAME = 'users';

export class CreateUsers1575362582359 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'first_surname',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'second_surname',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                },
            ],
        }), true);

        await queryRunner.createIndex('users', new TableIndex({
            name: 'IDX_USERS_EMAIL',
            columnNames: ['email'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex(TABLE_NAME, 'IDX_USERS_EMAIL');
        await queryRunner.dropTable(TABLE_NAME);
    }

}
