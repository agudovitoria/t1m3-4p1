import { setConnection } from './setConnection';
import { manageCommands } from './manageCommands';
import { readDataFiles } from './readDataFiles';

export const execute = async () => {
  await setConnection();
  manageCommands(readDataFiles());
};
