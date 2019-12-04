import { Connection, getConnection } from 'typeorm';
import { Logger } from '@nestjs/common';
import { v4String } from 'uuid/interfaces';

const insertEntityIntoTable = async (table: string, entities: any[]) => {
  const ids: v4String[] = entities.map(e => e.id );
  const connection: Connection = getConnection();

  Logger.debug(`Inserting into ${table}`, ids.toString());

  return connection
    .createQueryBuilder()
    .insert()
    .into(table)
    .values(entities)
    .execute();
};

export const populate = (entities: any) => Object.keys(entities)
  .map(table => insertEntityIntoTable(table, entities[table]));
