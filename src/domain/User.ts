import { v4String } from 'uuid/interfaces';

export default class User {
  id: v4String;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
}
