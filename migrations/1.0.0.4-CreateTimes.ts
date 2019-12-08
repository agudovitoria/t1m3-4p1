import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

const TABLE_NAME = 'times';

export class CreateTimes1575362582359 implements MigrationInterface {
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
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'date',
                    type: 'DATE',
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
                    isNullable: true,
                },
                {
                    name: 'product_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'concept_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'timing',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'validated',
                    type: 'boolean',
                    default: false,
                    isNullable: false,
                },
            ],
        }), true);

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: 'IDX_USER_ID',
            columnNames: ['user_id'],
        }));

        await queryRunner.createForeignKey(TABLE_NAME, new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: 'IDX_PRODUCT_ID',
            columnNames: ['product_id'],
        }));

        await queryRunner.createForeignKey(TABLE_NAME, new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: 'IDX_CONCEPT_ID',
            columnNames: ['concept_id'],
        }));

        await queryRunner.createForeignKey(TABLE_NAME, new TableForeignKey({
            columnNames: ['concept_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'concepts',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.getTable(TABLE_NAME)
          .then(table => table.foreignKeys.forEach(fk => queryRunner.dropForeignKey(TABLE_NAME, fk)));
        await queryRunner.dropIndex(TABLE_NAME, 'IDX_USER_ID');
        await queryRunner.dropIndex(TABLE_NAME, 'IDX_PRODUCT_ID');
        await queryRunner.dropIndex(TABLE_NAME, 'IDX_CONCEPT_ID');
        await queryRunner.dropTable(TABLE_NAME);
    }

}
