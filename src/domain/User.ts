import { v4String } from 'uuid/interfaces';
import { UserEntity } from '../persistence/UserEntity';

export default class User {
  id: v4String;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  email: string;

  fromEntity(userEntity: UserEntity): User {
    this.id = userEntity.id;
    this.firstName = userEntity.firstName;
    this.firstSurname = userEntity.firstSurname;
    this.secondSurname = userEntity.secondSurname;
    this.email = userEntity.email;

    return this;
  }

  fromRequest(request: any): User {
    const { id, firstName, firstSurname, secondSurname, email }: User = request;
    this.id = id;
    this.firstName = firstName;
    this.firstSurname = firstSurname;
    this.secondSurname = secondSurname;
    this.email = email;

    return this;
  }

  toJson(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      firstSurname: this.firstSurname,
      secondSurname: this.secondSurname,
      email: this.email,
    };
  }
}
