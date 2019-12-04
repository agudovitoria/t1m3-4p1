import { Connection, getConnection } from 'typeorm';
import { Logger } from '@nestjs/common';
import { v4String } from 'uuid/interfaces';

const insertEntityIntoTable = async (table: string, entity: any) => {
  const connection: Connection = getConnection();

  return connection
    .createQueryBuilder()
    .insert()
    .into(table)
    .values(entity)
    .execute()
    .then(() => Logger.debug('Inserted successfully!'))
    .catch(({ message }: { message: string }) => Logger
      .error(`Error when inserting: ${message}`));
};

export const populate = (entities: any) => {
  Object.keys(entities)
    .map(table => {
      const entity: any = entities[table];

      entity.map(async ({ id }: { id: v4String }) => {
        Logger.debug(`Populating to ${table} with id ${id}`);
        await insertEntityIntoTable(table, entity);
      });
    });
};
