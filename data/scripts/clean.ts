import { Connection, createConnection, getConnection } from 'typeorm';
import { v4String } from 'uuid/interfaces';
import { Logger } from '@nestjs/common';

const deleteById = async (table: any, id: v4String) => {
  const connection: Connection = getConnection();

  return connection
    .createQueryBuilder()
    .delete()
    .from(table)
    .where('id=:id', { id })
    .execute()
    .then(() => Logger.debug('Deleted successfully!'))
    .catch(({ message }: { message: string }) => Logger
      .error(`Error when deleting: ${message}`));
};

export const clean = (entities: any) => {
  Object.keys(entities)
    .map(table => {
      const entity = entities[table];

      entity.map(async ({ id }: { id: v4String }) => {
        Logger.debug(`Deleting from ${table} with id ${id}`);
        await deleteById(table, id);
      });
    });
};
