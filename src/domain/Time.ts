import { v4String } from 'uuid/interfaces';
import User from './User';
import Product from './Product';
import Concept from './Concept';

export default class Time {
  id: v4String;
  user: User;
  date: Date;
  product: Product;
  concept: Concept;
  timing: number;
  validated: boolean;
}
