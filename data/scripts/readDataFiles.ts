import * as fs from 'fs';
import { resolve } from 'path';

export const readDataFiles = () => {
  const users: any = JSON.parse(fs.readFileSync(resolve(__dirname + '/../users.json'), 'utf8'));
  const products: any = JSON.parse(fs.readFileSync(resolve(__dirname + '/../products.json'), 'utf8'));
  const concepts: any = JSON.parse(fs.readFileSync(resolve(__dirname + '/../concepts.json'), 'utf8'));
  const times: any = JSON.parse(fs.readFileSync(resolve(__dirname + '/../times.json'), 'utf8'));

  return { users, products, concepts, times };
};
