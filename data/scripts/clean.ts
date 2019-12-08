import { Connection, getConnection } from 'typeorm';
import { v4 } from 'uuid/interfaces';
import { Logger } from '@nestjs/common';

const deleteById = async (table: any, id: v4) => {
  const connection: Connection = getConnection();

  Logger.debug(`Deleting ${id} from ${table}`);

  return connection
    .createQueryBuilder()
    .delete()
    .from(table)
    .where('id=:id', { id })
    .execute()
    .then(() => Logger.debug(`Deleted ${id} from ${table} successfully!`))
    .catch(({ message }: { message: string }) => Logger
      .error(`Error deleting ${id} from ${table}: ${message}`));
};

export const clean = (entities: any) => Object.keys(entities)
  .map(table => entities[table].map(async ({ id }: { id: v4 }) => await deleteById(table, id)));
