import { v4 } from 'uuid/interfaces';

export default class User {
  id: v4;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
}
