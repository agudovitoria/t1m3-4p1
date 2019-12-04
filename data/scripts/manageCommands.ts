import { Logger } from '@nestjs/common';
import { populate } from './populate';
import { clean } from './clean';

export const manageCommands = (entities: any) => {
  const { users, products, concepts, times } = entities;

  switch (process.argv[2]) {
    case 'populate':
      Logger.log('Populating database');
      populate({ users, products, concepts, times });
      break;
    case 'clean':
      Logger.log('Cleaning database');
      clean({ times, concepts, products, users });
      break;
    default:
  }
};
